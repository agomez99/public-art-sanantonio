import { useRouter } from 'next/router'
import geoJson from '../data/locations.json'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const Page = ({ name, avatar, image, heading }) => {
    console.log(name)

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
             <Navbar />
            <Container>
            <Row>
            <Col sm={8}>
            <h1 className='bio-name'>{name}</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </Col>

            <Col sm={4}>
            <div className="image-box">
                <Image src={avatar} width={300} height={300} alt="image" className='bio-image'/>
            </div>
            </Col>
            </Row>
            <Row>
                    <Col>
                        <Image src={image} width={200} height={200} alt="image" className='art-image'/>
                        <p>{heading}</p>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
export async function getStaticPaths() {
    const categories = geoJson.features;
    const paths = categories.map(({ properties: { name, avatar, image, heading } }) => ({
        params: { slug: name, avatar, image, heading }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const categories = geoJson.features;
    const category = categories.find(
        ({ properties: { name } }) => name === params.slug
    );

    return {
        props: {
            name: category.properties.name,
            avatar: category.properties.avatar,
            image: category.properties.image,
            heading: category.properties.heading

        }
    };
}





export default Page