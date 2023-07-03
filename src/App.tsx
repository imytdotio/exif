import React, { useState } from "react";
import exifr from "exifr";

interface ImageMetadata {
  tagName: string;
  data: string | number | boolean;
}

function App() {
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata[]>([]);

  // Parse all image metadata
  // const handleImageUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (!event.target.files || event.target.files.length === 0) {
  //     return;
  //   }

  //   const file = event.target.files[0];

  //   try {
  //     const exif = await exifr.parse(file);
  //     if (exif) {
  //       const formattedData = Object.entries(exif).map(([tagName, data]) => ({
  //         tagName,
  //         data: JSON.stringify(data),
  //       }));
  //       setImageMetadata(formattedData);
  //       console.log("Image metadata:", formattedData);
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse image:", error);
  //   }
  // };

  // Parse Latitude, Longitude, and Date and Time

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    try {
      const exif = await exifr.parse(file, { gps: true });
      if (exif) {
        const { latitude, longitude, DateTimeOriginal } = exif;
        setImageMetadata([
          { tagName: "Latitude", data: latitude },
          { tagName: "Longitude", data: longitude },
          { tagName: "Date and Time", data: DateTimeOriginal.toString() },
        ]);
      }
      console.log("Image metadata:", exif);
    } catch (error) {
      console.error("Failed to parse image:", error);
    }
  };

  return (
    <div className="App">
      <h1>Image Metadata Viewer</h1>
      <input type="file" onChange={handleImageUpload} />
      <ul>
        {imageMetadata.map((item, index) => (
          <li key={index}>
            {item.tagName}: {item.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
