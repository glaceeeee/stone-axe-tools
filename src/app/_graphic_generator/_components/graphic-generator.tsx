import React, { useState } from "react";
import GraphicCanvas from "./graphic-canvas";

const thumbnailOptions = [
  {
    fileName: "public/thumbnails/hBP03-006_Inugami-Korone.png",
    cardNumber: "hBP03-006",
    cardName: "Inugami Korone",
    rarity: "OSR",
  },
  {
    fileName: "public/thumbnails/hBP06-001_Raora-Panthera.png",
    cardNumber: "hBP06-001",
    cardName: "Raora Panthera",
    rarity: "OSR",
  },
  {
    fileName: "public/thumbnails/hBP06-003_Kazama-Iroha.png",
    cardNumber: "hBP06-003",
    cardName: "Kazama Iroha",
    rarity: "OSR",
  },
  {
    fileName: "public/thumbnails/hBP06-004_Nakiri-Ayame.png",
    cardNumber: "hBP06-004",
    cardName: "Nakiri Ayame",
    rarity: "OSR",
  },
  {
    fileName: "public/thumbnails/hEB01-001_Tokino-Sora.png",
    cardNumber: "hEB01-001",
    cardName: "Tokino Sora",
    rarity: "OSR",
  },
  {
    fileName: "public/thumbnails/hEB01-002_Houshou-Marine.png",
    cardNumber: "hEB01-002",
    cardName: "Houshou Marine",
    rarity: "OSR",
  },
  {
    fileName: "public/thumbnails/hEB01-003_Hakui-Koyori.png",
    cardNumber: "hEB01-003",
    cardName: "Hakui Koyori",
    rarity: "OSR",
  }
].sort((a, b) => {
  if (a.cardName > b.cardName) {
    return 1;
  }
  if (a.cardName < b.cardName) {
    return -1;
  }
  return 0;
});

const thumbnailSelectors = document.querySelectorAll("select.thumbnail-selector");
thumbnailSelectors.forEach(selector => {
  thumbnailOptions.forEach(({ fileName, cardNumber, cardName, rarity }) => {
    const optionText = `${cardName} - ${cardNumber} - ${rarity}`;
    const option = document.createElement("option");
    option.value = fileName;
    option.textContent = optionText;
    selector.appendChild(option);
  });
});

export default function GraphicGenerator() {
  const [backgroundFile, setBackgroundFile] = useState<File | undefined>(undefined);
  const [slotBordersFile, setSlotBordersFile] = useState<File | undefined>(undefined);
  const [ranksFile, setRanksFile] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [topRightText, setTopRightText] = useState("");
  const [bottomLeftText, setBottomLeftText] = useState("");

  const handleBackgroundFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBackgroundFile(e.target.files?.[0]);
  };
  const handleSlotBordersFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSlotBordersFile(e.target.files?.[0]);
  };
  const handleRanksFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRanksFile(e.target.files?.[0]);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const handleTopRightTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTopRightText(e.target.value);
  };
  const handleBottomLeftTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBottomLeftText(e.target.value);
  };

  const rankToThumbnailSrc = [1, 2, 3, 4, 5, 6, 7, 8].reduce((map, rank) => {
    const selectedThumbnailValue = document.getElementById(`participant${rank}-thumbnail`).value;
    if (selectedThumbnailValue) {
      map.set(rank, selectedThumbnailValue);
    }
    return map;
  }, new Map());
  const rankToParticipantName = [1, 2, 3, 4, 5, 6, 7, 8].reduce((map, rank) => {
    const inputParticipantName = document.getElementById(`participant${rank}-name`).value;
    if (inputParticipantName) {
      map.set(rank, inputParticipantName);
    }
    return map;
  }, new Map());
  return (
    <>
      <fieldset>
      <legend>General</legend>
      
      <div>
        <label htmlFor="background">Background: </label>
        <input type="file" name="background" required accept="image/png" onChange={handleBackgroundFileChange} />
      </div>

      <div>
        <label htmlFor="slot-borders">Slot borders: </label>
        <input type="file" name="slot-borders" required accept="image/png" onChange={handleSlotBordersFileChange} />
      </div>

      <div>
        <label htmlFor="ranks">Ranks: </label>
        <input type="file" name="ranks" required accept="image/png" onChange={handleRanksFileChange} />
      </div>

      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" onChange={handleTitleChange} />
      </div>

      <div>
        <label htmlFor="top-right-text">Top right text: </label>
        <input type="text" name="top-right-text" onChange={handleTopRightTextChange} />
      </div>

      <div>
        <label htmlFor="bottom-left-text">Bottom left text: </label>
        <input type="text" name="bottom-left-text" onChange={handleBottomLeftTextChange} />
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 1</legend>
      <div>
        <label htmlFor="participant1-name">Name: </label>
        <input type="text" id="participant1-name" name="participant1-name" />
      </div>
      <div>
        <label htmlFor="participant1-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant1-thumbnail" id="participant1-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 2</legend>
      <div>
        <label htmlFor="participant2-name">Name: </label>
        <input type="text" id="participant2-name" name="participant2-name" />
      </div>
      <div>
        <label htmlFor="participant2-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant2-thumbnail" id="participant2-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 3</legend>
      <div></div>
      <label htmlFor="participant3-name">Name: </label>
      <input type="text" id="participant3-name" name="participant3-name" />
      <div>
        <label htmlFor="participant3-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant3-thumbnail" id="participant3-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 4</legend>
      <div>
        <label htmlFor="participant4-name">Name: </label>
        <input type="text" id="participant4-name" name="participant4-name" />
      </div>
      <div>
        <label htmlFor="participant4-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant4-thumbnail" id="participant4-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 5</legend>
      <div>
        <label htmlFor="participant5-name">Participant 5: </label>
        <input type="text" id="participant5-name" name="participant5-name" />
      </div>
      <div>
        <label htmlFor="participant5-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant5-thumbnail" id="participant5-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 6</legend>
      <div>
        <label htmlFor="participant6-name">Name: </label>
        <input type="text" id="participant6-name" name="participant6-name" />
      </div>
      <div>
        <label htmlFor="participant6-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant6-thumbnail" id="participant6-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 7</legend>
      <div>
        <label htmlFor="participant7-name">Name: </label>
        <input type="text" id="participant7-name" name="participant7-name" />
      </div>
      <div>
        <label htmlFor="participant7-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant7-thumbnail" id="participant7-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <fieldset>
      <legend>Participant 8</legend>
      <div>
        <label htmlFor="participant8-name">Name: </label>
        <input type="text" id="participant8-name" name="participant8-name" />
      </div>
      <div>
        <label htmlFor="participant8-thumbnail">Thumbnail: </label>
        <select className="thumbnail-selector" name="participant8-thumbnail" id="participant8-thumbnail">
          <option value="">-- Please select an option--</option>
        </select>
      </div>
    </fieldset>

    <div>
      <button id="generate-button" type="button">Generate</button>
    </div>

    <GraphicCanvas
      height={1920}
      width={1080}
      backgroundFile={backgroundFile}
      slotBordersFile={slotBordersFile}
      ranksFile={ranksFile}
      title={title}
      topRightText={topRightText}
      bottomLeftText={bottomLeftText}
      rankToParticipantName={rankToParticipantName}
      rankToThumbnailSrc={rankToThumbnailSrc}
    />
    </>
  );
}
