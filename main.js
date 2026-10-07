function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image;
    image.onload = () => resolve(image);
    image.onerror = () => reject(`new Error(Could not load image: ${src}`);
    image.src = src
  });
}

const rankToThumbnailProperties = new Map([
  [1, {dx: 73, dy: 211, dWidth: 649, dHeight: 649}],
  [2, {dx: 748, dy: 212, dWidth: 348, dHeight: 348}],
  [3, {dx: 1122, dy: 212, dWidth: 348, dHeight: 348}],
  [4, {dx: 1496, dy: 212, dWidth: 348, dHeight: 348}],
  [5, {dx: 745, dy: 605, dWidth: 255, dHeight: 255}],
  [6, {dx: 1029, dy: 605, dWidth: 255, dHeight: 255}],
  [7, {dx: 1310, dy: 605, dWidth: 255, dHeight: 255}],
  [8, {dx: 1589, dy: 605, dWidth: 255, dHeight: 255}],
]);

const rankToParticipantNameProperties = new Map([
  [1, {x: 397.5, y: 860, maxWidth: 649, fontSize: '120px', lineWidth: 3}],
  [2, {x: 922, y: 560, maxWidth: 348, fontSize: '65px', lineWidth: 2}],
  [3, {x: 1296, y: 560, maxWidth: 348, fontSize: '65px', lineWidth: 2}],
  [4, {x: 1670, y: 560, maxWidth: 348, fontSize: '65px', lineWidth: 2}],
  [5, {x: 872.5, y: 860, maxWidth: 255, fontSize: '50px', lineWidth: 1}],
  [6, {x: 1156.5, y: 860, maxWidth: 255, fontSize: '50px', lineWidth: 1}],
  [7, {x: 1437.5, y: 860, maxWidth: 255, fontSize: '50px', lineWidth: 1}],
  [8, {x: 1716.5, y: 860, maxWidth: 255, fontSize: '50px', lineWidth: 1}],
]);

async function generate() {
  const backgroundFile = document.getElementById("background").files[0];
  const slotBordersFile = document.getElementById("slot-borders").files[0];
  const ranksFile = document.getElementById("ranks").files[0];
  const title = document.getElementById("title").value;
  const topRightText = document.getElementById("top-right-text").value;
  const bottomLeftText = document.getElementById("bottom-left-text").value;
  const rankToThumbnailSrc = Array.from(rankToThumbnailProperties.keys()).reduce((map, rank) => {
    const selectedThumbnailValue = document.getElementById(`participant${rank}-thumbnail`).value;
    if (selectedThumbnailValue) {
      map.set(rank, selectedThumbnailValue);
    }
    return map;
  }, new Map());
  const rankToParticipantName = Array.from(rankToParticipantNameProperties.keys()).reduce((map, rank) => {
    const inputParticipantName = document.getElementById(`participant${rank}-name`).value;
    if (inputParticipantName) {
      map.set(rank, inputParticipantName);
    }
    return map;
  }, new Map());

  const canvas = document.getElementById("result-canvas");
  const ctx = canvas.getContext("2d");

  const backgroundFileURL = URL.createObjectURL(backgroundFile)
  const slotBordersFileURL = URL.createObjectURL(slotBordersFile)
  const ranksFileURL = URL.createObjectURL(ranksFile)
  let backgroundImage, slotBordersImage, ranksImage;
  try {
    [
      backgroundImage, 
      slotBordersImage, 
      ranksImage,
    ] = await Promise.all([
      loadImage(backgroundFileURL),
      loadImage(slotBordersFileURL),
      loadImage(ranksFileURL),
    ]);
  } finally {
    URL.revokeObjectURL(backgroundFileURL)
    URL.revokeObjectURL(slotBordersFileURL)
    URL.revokeObjectURL(ranksFileURL)
  }

  const rankToThumbnailImage = new Map();
  const thumbnailImagePromises = [];
  for (const [rank, thumbnailSrc] of rankToThumbnailSrc) {
    const imagePromise = loadImage(thumbnailSrc);
    imagePromise.then(image => rankToThumbnailImage.set(rank, image));
    thumbnailImagePromises.push(imagePromise);
  }
  await Promise.all(thumbnailImagePromises);
  
  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;
  ctx.drawImage(backgroundImage, 0, 0);
  for (const [rank, thumbnailImage] of rankToThumbnailImage) {
    const {dx, dy, dWidth, dHeight} = rankToThumbnailProperties.get(rank);
    ctx.drawImage(thumbnailImage, dx, dy, dWidth, dHeight);
  }
  ctx.drawImage(slotBordersImage, 0, 0);
  ctx.drawImage(ranksImage, 0, 0);

  ctx.textBaseline = "middle";

  ctx.font = '83px "American Captain", sans-serif';
  ctx.lineWidth = 3;
  ctx.letterSpacing = "-3px";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffeaa5";
  ctx.strokeStyle = "#4f5961";
  ctx.fillText(title, 960, 171, 1200);
  ctx.strokeText(title, 960, 171, 1200);

  ctx.font = '56px "American Captain", sans-serif';
  ctx.lineWidth = 3;
  ctx.letterSpacing = "-2px";
  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.fillText(topRightText, 1844, 80);
  ctx.strokeText(topRightText, 1844, 80);

  ctx.font = '69px "American Captain", sans-serif';
  ctx.lineWidth = 3;
  ctx.letterSpacing = "-2px";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.fillText(bottomLeftText, 76, 1035);
  ctx.strokeText(bottomLeftText, 76, 1035);

  ctx.textBaseline = "bottom";
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#ffffff";
  ctx.letterSpacing = "-2px";
  ctx.textAlign = "center";
  for (const [rank, participantName] of rankToParticipantName) {
    const {x, y, maxWidth, fontSize, lineWidth} = rankToParticipantNameProperties.get(rank);
    ctx.font = `${fontSize} "American Captain", sans-serif`;
    ctx.lineWidth = lineWidth;
    ctx.fillText(participantName, x, y, maxWidth);
    ctx.strokeText(participantName, x, y, maxWidth);
  }
}

const thumbnailOptions = [
  {
    fileName: "images/thumbnails/hBP03-006_Inugami-Korone.png",
    cardNumber: "hBP03-006",
    cardName: "Inugami Korone",
    rarity: "OSR",
  },
  {
    fileName: "images/thumbnails/hBP06-001_Raora-Panthera.png",
    cardNumber: "hBP06-001",
    cardName: "Raora Panthera",
    rarity: "OSR",
  },
  {
    fileName: "images/thumbnails/hBP06-003_Kazama-Iroha.png",
    cardNumber: "hBP06-003",
    cardName: "Kazama Iroha",
    rarity: "OSR",
  },
  {
    fileName: "images/thumbnails/hBP06-004_Nakiri-Ayame.png",
    cardNumber: "hBP06-004",
    cardName: "Nakiri Ayame",
    rarity: "OSR",
  },
  {
    fileName: "images/thumbnails/hEB01-001_Tokino-Sora.png",
    cardNumber: "hEB01-001",
    cardName: "Tokino Sora",
    rarity: "OSR",
  },
  {
    fileName: "images/thumbnails/hEB01-002_Houshou-Marine.png",
    cardNumber: "hEB01-002",
    cardName: "Houshou Marine",
    rarity: "OSR",
  },
  {
    fileName: "images/thumbnails/hEB01-003_Hakui-Koyori.png",
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

const generateButton = document.getElementById("generate-button");
generateButton.addEventListener("click", generate);
