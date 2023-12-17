import { Marker, Popup } from 'react-leaflet';
import Image from 'next/image';

const icon = L.icon({
    iconUrl: './marker.png',
    iconSize: [40, 40],

});

export default function PopupMarker({ id, position, imageSrc, description, link, linkText }) {
    return (
        <Marker key={id} position={position} icon={icon}>
            <Popup position={position}>
                <div className='flex flex-col'>
                    <Image src={imageSrc} width={100} height={100} alt='pop up image' />
                    <span>{description}</span>
                    <a href={link}>{linkText}</a>
                </div>
            </Popup>
        </Marker>
    )
}