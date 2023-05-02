import {data} from '../components/artistdata'
import Image from 'next/image'
import Link from 'next/link'




export const ImageBox = () => {
    return (
        <div className="image-box-container">
                {data.map((data, key) => {
                    return (
                        <div key={key} className="image-box">
                        <Link href={data.properties.info}>
                            <Image className="image"src={data.properties.image} alt="artist" width={200} height={200}/>
                        </Link>
                        </div>
                    );
                })}
        </div>

    )
}


