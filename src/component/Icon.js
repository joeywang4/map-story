import L from 'leaflet';

const colorPins = ["black", "blue", "green", "orange", "purple", "red", "white", "yellow"].map(color => 
    new L.Icon({
        iconUrl: require(`../img/markers/${color}pin.png`),
        shadowUrl: null,
   
        iconSize: [40, 40],
        iconAnchor: [20,40],
        shadowSize: null,
        shadowAnchor: null,
        popupAnchor: [0, -37]
    })
)

const strToIcon = s => {
    let sum = 0;
    s.split('').forEach(chr => {
        sum += chr.charCodeAt(0);
    });
    return colorPins[sum % colorPins.length];
}

const getIcon = num => colorPins[num];

export { strToIcon, getIcon };