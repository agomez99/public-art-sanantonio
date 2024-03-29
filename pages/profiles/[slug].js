import { useRouter } from 'next/router'
import geoJson from '../data/locations.json'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from "framer-motion";
import styles from '../../styles/Profile.module.css'

import Head from 'next/head'

const Page = ({ name, avatar,imagesAndHeadings , about }) => {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                  <Head>
      <title>{name}</title>
      </Head>
                <Container className={styles.bioContainer}  >
                    <Row>
                        <Col md={8}>
                            <h1 className={styles.bioName}>{name}</h1>
                            <p className={styles.bioAbout}>{about}</p>
                        </Col>

                        <Col sm={4}>
                            <div className={styles.imageBox}>
               
                                <Image src={avatar} width={300} height={300} alt="image" className={styles.bioImage} />
                            </div>
                        </Col>
                    </Row>
                    <Row>     
                    <div className={styles.works}>                     
                    {imagesAndHeadings.map(({ image, heading }, index) => (
                                <div key={index} >
                                    <Image src={image} width={200} height={200} alt="image" className={styles.artImage} />
                                    <p className={styles.artHeading}>{heading}</p>
                                </div>
                            ))}
                            </div>
                    </Row>
                </Container>
            </motion.div>
        </div>
    )
}

export async function getStaticPaths() {
    const categories = geoJson.features;
    const paths = categories.map(({ properties: { name } }) => ({
        params: { slug: name }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const categories = geoJson.features;
    const propertiesWithSameName = categories.filter(
        ({ properties: { name } }) => name === params.slug
    );
    const imagesAndHeadings = propertiesWithSameName.map(property => ({
        image: property.properties.image,
        heading: property.properties.heading
    }));

    return {
        props: {
            imagesAndHeadings,

            name: propertiesWithSameName[0].properties.name,
            avatar: propertiesWithSameName[0].properties.avatar,
            about: propertiesWithSameName[0].properties.about

        }
    };
}



export default Page