import { Marker, Popup } from 'react-leaflet';
import Image from 'next/image';
import { useMap } from 'react-leaflet'

const icon = L.icon({
    iconUrl: './marker.png',
    iconSize: [40, 40],

});

export default function PopupMarker({ id, position, imageSrc, content, link, linkText }) {
    const map = useMap()

    return (
        <Marker
            eventHandlers={{
                click: (e) => {
                    map.flyTo(e.latlng, map.getZoom(), {
                        animate: true,
                        duration: .5
                    })
                },
            }}
            interactive={true}

            key={id}
            position={position}
            icon={icon}
        >

            <Popup position={position}>


                <div className='flex flex-col'>
                    <Image src={imageSrc} width={100} height={100} alt='pop up image' />
                    <span>{content}</span>
                    <a href={link}>{linkText}</a>
                </div>
            </Popup>
        </Marker>
    )
}