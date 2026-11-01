import { loadImage } from "@/utils/images";

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

interface GraphicCanvasProps {
  height: number;
  width: number;
  backgroundFile?: File;
  slotBordersFile?: File;
  ranksFile?: File;
  title?: string;
  topRightText?: string;
  bottomLeftText?: string;
  rankToParticipantName: Map<number, string>;
  rankToThumbnailSrc: Map<number, string>;
}

export default function GraphicCanvas(props: GraphicCanvasProps) {
  const canvas = <canvas></canvas>;
  const ctx = canvas.getContext("2d");
  
  canvas.width = props.width;
  canvas.height = props.height;

  const backgroundFileURL = URL.createObjectURL(props.backgroundFile)
  const slotBordersFileURL = URL.createObjectURL(props.slotBordersFile)
  const ranksFileURL = URL.createObjectURL(props.ranksFile)
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
  for (const [rank, thumbnailSrc] of props.rankToThumbnailSrc) {
    const imagePromise = loadImage(thumbnailSrc);
    imagePromise.then(image => rankToThumbnailImage.set(rank, image));
    thumbnailImagePromises.push(imagePromise);
  }
  await Promise.all(thumbnailImagePromises);
  
  ctx.drawImage(backgroundImage, 0, 0);
  for (const [rank, thumbnailImage] of rankToThumbnailImage) {
    const {dx, dy, dWidth, dHeight} = rankToThumbnailProperties.get(rank)!;
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
  ctx.fillText(props.title, 960, 171, 1200);
  ctx.strokeText(props.title, 960, 171, 1200);

  ctx.font = '56px "American Captain", sans-serif';
  ctx.lineWidth = 3;
  ctx.letterSpacing = "-2px";
  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.fillText(props.topRightText, 1844, 80);
  ctx.strokeText(props.topRightText, 1844, 80);

  ctx.font = '69px "American Captain", sans-serif';
  ctx.lineWidth = 3;
  ctx.letterSpacing = "-2px";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.fillText(props.bottomLeftText, 76, 1035);
  ctx.strokeText(props.bottomLeftText, 76, 1035);

  ctx.textBaseline = "bottom";
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#ffffff";
  ctx.letterSpacing = "-2px";
  ctx.textAlign = "center";
  for (const [rank, participantName] of props.rankToParticipantName) {
    const {x, y, maxWidth, fontSize, lineWidth} = rankToParticipantNameProperties.get(rank)!;
    ctx.font = `${fontSize} "American Captain", sans-serif`;
    ctx.lineWidth = lineWidth;
    ctx.fillText(participantName, x, y, maxWidth);
    ctx.strokeText(participantName, x, y, maxWidth);
  }

  return canvas;
}
