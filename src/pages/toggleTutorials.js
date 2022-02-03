import React from 'react';
import { VideoPlayer, Card } from '../components';
import { Helmet } from 'react-helmet';
const ToggleTutorials = () => {
  return (
    <div className="flex flex-col px-3 py-5">
      {/*SEO Support*/}
      <Helmet>
        <title>Tutorials | Windswept</title>
      </Helmet>
      {/*SEO Support End */}
      <h1 className="text-2xl px-9 uppercase font-bold">Toggle Tutorials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2">
        <div>
          <Card
            video={<VideoPlayer />}
            title={'Mountain'}
            description={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            }
          />
        </div>
        <div>
          <Card
            video={<VideoPlayer />}
            title={'Mountain'}
            description={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            }
          />
        </div>

        <Card
          video={<VideoPlayer />}
          title={'Mountain'}
          description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
        />
        <Card
          video={<VideoPlayer />}
          title={'Mountain'}
          description={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
        />
      </div>
    </div>
  );
};

export default ToggleTutorials;
