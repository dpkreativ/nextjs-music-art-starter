import Head from 'next/head';
import { useState } from 'react';
import CreateAlbumArt from '../components/CreateAlbumArt';
import { ArrowSVG } from '../components/Icons';
import UploadPopArt from '../components/UploadPopArt';

export default function Home() {
  // === STATE MANAGEMENT ===
  // States for storing and uploading image and text for your album
  const [myAlbumArtData, setmyAlbumArtData] = useState({ text: '', image: '' });
  const [myAlbumArtPreview, setmyAlbumArtPreview] = useState();

  // States for storing, uploading, and applying Neural Art Style Transfer
  const [popArtPreview, setPopArtPreview] = useState();
  const [popArtData, setPopArtData] = useState();

  // Loading States
  const [loadingMyAlbumArt, setloadingMyAlbumArt] = useState(false);
  const [loadingPopArt, setLoadingPopArt] = useState(false);

  // === ONCHANGE FUNCTONS ===
  /* Handle Text Input Change: 
      This function detects any changes to the text input 
  */
  const handleTextChange = (e) => {
    setmyAlbumArtData({ ...myAlbumArtData, text: e.target.value });
  };

  /* Handle File Input Change: 
      - This function detects any changes to the file input for your provided image
  */
  const handleFileChange = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (onLoadEvent) => {
      setmyAlbumArtData({
        ...myAlbumArtData,
        image: onLoadEvent.target.result,
      });
    };

    e.target.value = '';
  };

  /* Handle Popular Art File Input Change:
      - This function detects any changes to the popular album art file input
  */
  const handlePopArtChange = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (onLoadEvent) => {
      setPopArtPreview(onLoadEvent.target.result);
    };

    e.target.value = '';
  };

  // === ONSUBMIT FUNCTIONS ===
  /* Handle Album Submit: 
      - This function uploads your image and text data to create your album art.
  */
  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
  };

  /* Handle Album Art Style Transfer: 
      - This function uploads your selected popular album art and applies Neural Art Style Transfer to it.
  */
  const handlePopArtSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Head>
        <title>NextJS Music Cover Art</title>
        <meta
          name="description"
          content="Generating Music Cover Art with NextJS and Cloudinary"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-5 w-full max-w-4xl mx-auto">
        <header className="py-5">
          <h1 className="font-semibold text-xl text-center">
            NextJS Album Art with Neural Style Transfer
          </h1>
        </header>
        <main className="grid md:grid-cols-2 gap-10">
          {/* In this section below: 
                - You're selecting your own image which will be previewed, and adding some text to the state.
                - You're uploading your image and text to Cloudinary which will handle image transformation.
                - Cloudinary returns the transformed image, which you then display as a preview.
           */}
          <section className="md:col-span-1">
            <div className="w-full h-72 my-2 border-blue-400 border-2 rounded-lg">
              {myAlbumArtData.image !== '' ? (
                <img
                  src={myAlbumArtData.image}
                  alt="an image"
                  className="object-contain h-full w-full"
                />
              ) : myAlbumArtPreview !== undefined ? (
                <img
                  src={myAlbumArtPreview.url}
                  alt="transformed image"
                  className="object-contain h-full w-full"
                />
              ) : (
                <span className="self-center flex flex-col space-y-3 p-5">
                  <p className="italic">Add your image and text below</p>
                  <div className="animate-bounce">
                    <ArrowSVG />
                  </div>
                </span>
              )}
            </div>
            <CreateAlbumArt
              onSubmit={handleAlbumSubmit}
              textChange={handleTextChange}
              fileChange={handleFileChange}
              textValue={myAlbumArtData.text}
              loading={loadingMyAlbumArt}
            />
          </section>

          {/* In this section below: 
                - You're selecting any popular album art image which will be previewed.
                - You're uploading your selected album art image to Cloudinary which will return an object containing data like its public_id.
           */}
          <section className="md:col-span-1">
            <div className="w-full h-72 my-2 border-blue-400 border-2 rounded-lg">
              {popArtPreview !== undefined ? (
                <img
                  src={popArtPreview}
                  alt="Modern art for the album"
                  className="object-contain h-full w-full"
                />
              ) : (
                <span className="self-center flex flex-col space-y-3 p-5">
                  <p className="italic">Add a popular album art below</p>
                  <div className="animate-bounce">
                    <ArrowSVG />
                  </div>
                </span>
              )}
            </div>
            <UploadPopArt
              onSubmit={handlePopArtSubmit}
              onChange={handlePopArtChange}
              loading={loadingPopArt}
            />
          </section>

          {/* In this section below: 
                - You're creating a dynamic image URL with Neural Art Style Transfer parameters applied.
                - The URL is set as the image src and displays the AI-generated album art.
           */}
          <section className="md:col-span-2">
            <div className="w-full h-72 border-blue-400 border-2 rounded-lg">
              {popArtData !== undefined ? (
                <img
                  src={`https://res.cloudinary.com/dpkreativ/image/upload/l_${popArtData.public_id}/e_style_transfer,fl_layer_apply/${myAlbumArtPreview.public_id}.${myAlbumArtPreview.format}`}
                  alt="final image"
                  className="object-contain h-full w-full"
                />
              ) : (
                <span className="self-center flex flex-col space-y-3 p-5">
                  <p className="italic">Final image here</p>
                </span>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
