export function createIdForTree(data) {
  const { lng, lat, species, sourceId } = formatStrings(data);
  const hashed = geohashToInt(lat, lng, 52);
  const idString = `${sourceId}${species}-${hashed}`;
  return Math.abs(cyrb53(idString));
}

function formatStrings(d) {
  const sourceId =
    (d.sourceId || d.city).toLowerCase().replaceAll(' ', '_') || '';
  const species = d.species || d.scientific || '';
  return {
    sourceId,
    species: species ? `-${species.toLowerCase()}` : '',
    lat: truncateTo(d.lat, 8),
    lng: truncateTo(d.lng, 8),
  };
}

function geohashToInt(latitude, longitude, bitDepth) {
  bitDepth = bitDepth || 52;

  let bitsTotal = 0;
  let combinedBits = 0;
  let mid = null;
  let maxLat = 90;
  let minLat = -90;
  let maxLon = 180;
  let minLon = -180;

  while (bitsTotal < bitDepth) {
    combinedBits *= 2;
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2;
      if (longitude > mid) {
        combinedBits += 1;
        minLon = mid;
      } else {
        maxLon = mid;
      }
    } else {
      mid = (maxLat + minLat) / 2;
      if (latitude > mid) {
        combinedBits += 1;
        minLat = mid;
      } else {
        maxLat = mid;
      }
    }
    bitsTotal++;
  }
  return combinedBits;
}

// This code originally appeared here:
// https://stackoverflow.com/a/52171480
function cyrb53(str, seed = 1) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// To fixed 8 decimal places
function truncateTo(unRouned, nrOfDecimals = 8) {
  const parts = String(unRouned).split('.');
  if (parts.length !== 2) {
    // without any decimal part
    return unRouned;
  }
  const newDecimals = parts[1].slice(0, nrOfDecimals);
  const newString = `${parts[0]}.${newDecimals}`;
  return Number(newString);
}
