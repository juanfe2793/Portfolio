import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
import SeriesNavigation from '@site/src/components/SeriesNavigation';
import AuthorFooter from '@site/src/components/AuthorFooter';

export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
    authors,
    frontMatter,
  } = metadata;

  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;

  const tagsExists = tags.length > 0;

  // BlogPost footer - details view
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

    const seriesName = frontMatter.series as string | undefined;
    const prevLink = frontMatter.prev_series_slug as string | undefined;
    const prevTitle = frontMatter.prev_series_title as string | undefined;
    const nextLink = frontMatter.next_series_slug as string | undefined;
    const nextTitle = frontMatter.next_series_title as string | undefined;

    return (
      <footer className="docusaurus-mt-lg">
        {seriesName && (
          <SeriesNavigation
            seriesName={seriesName}
            prevLink={prevLink}
            prevTitle={prevTitle}
            nextLink={nextLink}
            nextTitle={nextTitle}
          />
        )}

        {tagsExists && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}

        <AuthorFooter authors={authors} />

        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    );
  }

  // BlogPost footer - list view
  const renderFooter = tagsExists || truncatedPost;

  if (!renderFooter) {
    return null;
  }

  return (
    <footer className="row docusaurus-mt-lg">
      {tagsExists && (
        <div className={clsx('col', {'col--9': truncatedPost})}>
          <TagsListInline tags={tags} />
        </div>
      )}
      {truncatedPost && (
        <div
          className={clsx('col text--right', {
            'col--3': tagsExists,
          })}>
          <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
        </div>
      )}
    </footer>
  );
}
