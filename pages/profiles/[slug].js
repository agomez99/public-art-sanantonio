import { useRouter } from 'next/router'
import geoJson from '../data/locations.json'
import Image from 'next/image'







const Page = ({name, avatar}) => {
    console.log(name)

    const router = useRouter()
  const { id } = router.query

  return (
  <>
  <p>Post: {id}</p>

          <div className="image-box">
          <p>{name} </p>
          <Image src={avatar} width={300} height={300} alt="image" />
          </div>
       </>
)
}
export async function getStaticPaths() {
    const categories = geoJson.features;
    const paths = categories.map(({ properties: { name, avatar } }) => ({
      params: { slug: name, avatar }
    }));
  
    return {
      paths,
      fallback: false
    };
  }
  
  export async function getStaticProps({ params }) {
    const categories = geoJson.features;
    const category = categories.find(
      ({ properties: { name} }) => name === params.slug
    );
  
    return {
      props: {
        name: category.properties.name,
        avatar: category.properties.avatar

      }
    };
  }

  



export default Page