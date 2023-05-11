import { useRouter } from 'next/router'
import geoJson from '../data/locations.json'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const Page = ({ name, avatar, image, heading, about }) => {
    console.log(name)
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <Navbar />
            <Container>
                <Row>
                    <Col md={8}>
                        <h1 className='bio-name'>{name}</h1>
                        <p>{about}</p>
                    </Col>

                    <Col sm={4}>
                        <div className="image-box">
                            <Image src={avatar} width={300} height={300} alt="image" className='bio-image' />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image src={image} width={200} height={200} alt="image" className='art-image' />
                        <p>{heading}</p>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
export async function getStaticPaths() {
    const categories = geoJson.features;
    const paths = categories.map(({ properties: { name, avatar, image, heading, about } }) => ({
        params: { slug: name, avatar, image, heading, about }
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
            heading: category.properties.heading,
            about: category.properties.about

        }
    };
}





export default Page