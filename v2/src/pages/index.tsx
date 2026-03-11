import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): JSX.Element {
  return (
    <Layout title="Home" description="Juan Felipe Gomez - Staff Software Engineer">
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <img
          src={useBaseUrl('/img/headshot.jpg')}
          alt="Juan Felipe Gomez - Staff Software Engineer"
          className="profile-headshot"
        />
        <h1>Portfolio V2 - Initialization Complete</h1>
      </main>
    </Layout>
  );
}
