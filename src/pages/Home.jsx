import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ProductListSection from "../components/ProductListSection";
import {
  Container,
  Flex,
  Image,
  Heading,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Link,
  Center,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Card,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";

export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [homeData, setHome] = useState({});
  // let [isFull] = useMediaQuery("(max-width:1920px)");
  const [blogs, setBlogs] = useState([]);
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    CheckOrSetUDID();
    getHomePageData();
    getBlogs();
  }, []);

  async function getHomePageData() {
    const response = await client.get("/home");
    if (response.data.status === true) {
      setBanners(response.data.banners);
      setHome(response.data);
    }
    setLoading(false);
  }
  async function getBlogs() {
    const params = {};
    const response = await client.get("/home/blogs/", {
      params: params,
    });
    if (response.data.status === true) {
      setBlogs(response.data.blogs);
    }
  }

  const new_arrival_gir_gauveda = [
    {
      image1: "./Mango/Home/alphonso Mango.jpg",
      src: "alphonso",
      name: "Alphonso Mango",
      id: 1275,
    },
    // {
    //   image1: "./Mango/Home/kesar mango.jpg",
    //   src: "kesar",
    //   name: "Kesar Mango",
    // },
  ];

  return (
    <>
      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      {/* <Container maxW={"container.xl"} px={0}>
        {loading === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={puroco} />
        )}
      </Container> */}

      <Container maxW={"container.xl"} px={0}>
        <Carousel
          banners={[
            {
              image: "./Mango/NewBanner/mango_01.jpg",
              alt_text: "sweet1",
              image_url: "/products/1275",
            },
            {
              image: "./Mango/NewBanner/mango_02.jpg",
              alt_text: "sweet2",
              image_url: "/products/1275",
            },
            {
              image: "./Mango/NewBanner/mango_03.jpg",
              alt_text: "sweet2",
              image_url: "/products/1275",
            },
            {
              image: "./Mango/NewBanner/mango_04.jpg",
              alt_text: "sweet2",
              image_url: "/products/1275",
            },
          ]}
        />
      </Container>

      <Container maxW={{ md: "3xl", base: "xl" }} centerContent mb={5} mt={10}>
        <Image src="../Mango/Home/natural_mango.png" alt="" />
      </Container>
      <Container maxW={"6xl"} mb={8} mt={2} px={0}>
        <Text
          color={"text.300"}
          textAlign={{ md: "center", base: "justify" }}
          justifyContent={"justify"}
          px={{ base: 15, lg: 20 }}
          fontSize={{ base: "sm", lg: "md" }}
        >
          Luscious, sweet mangos are universally crowned “The king of the
          fruits” due to their distinctive flavor, fragrance, taste, and health-
          promoting qualities. They come in varying shapes and sizes but what we
          can all agree upon is that the flesh is juicy, orange-yellow in color,
          and a flavor that blows your senses. Our amazing organic mangoes are
          sourced from certified organic farms, contributing to their satisfying
          and rich taste and tartness. They are rich in potassium and magnesium
          and are a perfect treatment for high blood pressure. Mangoes are
          nutrient powerhouses, high in B-vitamins, vitamin A, vitamin C,
          vitamin E, and vitamin K.
        </Text>
      </Container>
      <Container centerContent>
        <Button
          borderRadius={"22px"}
          border={"1px solid"}
          _hover={{ bgColor: "#DD920A", color: "white" }}
          variant={"outline"}
          color={"text.500"}
          onClick={() => navigate("/about-us")}
        >
          {" "}
          Read More{" "}
        </Button>
      </Container>

      <Container centerContent mt={12}>
        <Image src={"./Mango/Home/Mango Webstie.jpg"} w={"50%"} alt="" />
      </Container>
      <Container maxW={"6xl"} centerContent>
        <ProductListSection
          // title="New Arrival Gir Gauveda"
          loading={loading}
          products={new_arrival_gir_gauveda}
        />
      </Container>
      <Container maxW={"container.xl"} px={{ md: 20, base: 8 }} centerContent>
        <Grid
          templateColumns={{
            md: "repeat(3, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gap={6}
        >
          <GridItem colSpan={1}>
            <Text color={"text.500"} fontSize={{ md: "3xl", base: "2xl" }}>
              About Natural Mango
            </Text>
            <Text color={"text.300"} textAlign={"justify"} fontSize={"md"}>
              With Natural farming activities, we promote the supply of genuine
              natural goods from our network of trustworthy farmers. This helps
              farmers to find a ready demand for their goods, reducing market
              uncertainties so that they can concentrate their resources on
              producing the best quality foods, while customers can find real
              natural food products at a fair price.
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Image src="./Mango/Home/mango_website.png" alt="" />
          </GridItem>
        </Grid>
      </Container>

      <Container centerContent mt={{ base: 4, md: 8, lg: 12 }}>
        <Image
          src="./Mango/Home/natural_mango_cycle.png"
          alt=""
          w={{ md: "100%", base: "70%" }}
        />
      </Container>

      <Container maxW={"container.xl"} px={0} mt={{ base: 4, md: 8, lg: 12 }}>
        <Image src="./Mango/Home/benefits.jpg" alt="" />
      </Container>

      <Container maxW={"container.xl"} px={0} mt={4}>
        <Image src="./Mango/Home/rating_review.png" alt="" />
      </Container>
       
      <Container maxW={"container.xl"}>
        <Heading
          color="brand.500"
          size="lg"
          mx="auto"
          align={"center"}
          mt={5}
         
        >
          BLOGS
        </Heading>

        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          px={2}
          py={3}
          spacing="40px"
        >
          {blogs?.slice(0, 8).map((blog) => (
            <GridItem key={blog.id} m={4}>
              <Card>
                <LinkBox h={400}>
                  <Image
                    src={blog.banner}
                    w="100%"
                    h="300px"
                    loading="lazy"
                    objectFit={"cover"}
                    borderRadius={5}
                    style={{
                      opacity: 1,
                      transition: "opacity 0.7s", // Note the corrected syntax here
                    }}
                  />
                  <LinkOverlay
                    _hover={{ color: "text.500" }}
                    href={`/blogs/${blog.id}/`}
                  >
                    <Heading size="sm" fontWeight={500} m={2}>
                      {blog.title}
                    </Heading>
                  </LinkOverlay>
                </LinkBox>
                <Flex m={2} justifyContent={"space-between"}>
                  <Text fontSize={"sm"} color="gray.500">
                    {new Intl.DateTimeFormat("en-CA", {
                      dateStyle: "long",
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(blog.published_at))}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"brand.500"}
                    onClick={() => navigate(`/blogs/${blog.id}/`)}
                    cursor={"pointer"}
                  >
                    Read more
                    <ChevronRightIcon />
                  </Text>
                </Flex>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Container maxW={"container.xl"} backgroundColor={"bg.500"} py={2}>
        <SimpleGrid
          columns={[2, 3, null, 4]}
          px={6}
          maxW={"container.xl"}
          my={6}
          color={"text.700"}
          align="center"
          spacingX={{ base: "10vw", md: "30px" }}
          spacingY="40px"
        >
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "4xl" }}>
              11+
            </StatNumber>
            <StatHelpText color="gray.600" fontSize={{ base: "md", md: "lg" }}>
              Natural Mango Varieties
            </StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "4xl" }}>
              7108+
            </StatNumber>
            <StatHelpText color="gray.600" fontSize={{ base: "md", md: "lg" }}>
              Satisfied Clients
            </StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "4xl" }}>
              14+
            </StatNumber>
            <StatHelpText color="gray.600" fontSize={{ base: "md", md: "lg" }}>
              Stores
            </StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "4xl" }}>
              100+
            </StatNumber>
            <StatHelpText color="gray.600" fontSize={{ base: "md", md: "lg" }}>
              City
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        <Box
          w="100%"
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{ md: 33, base: 21 }}
            mx="auto"
            align={"center"}
            my={3}
          >
            OUR CERTIFICATIONS & AWARDS
          </Heading>
        </Box>
        <Text
          mb={5}
          textAlign={{ md: "center", base: "justify" }}
          color="text.300"
        >
          We are committed to quality and each of our facilities is
          independently certified by an industry-accredited agency.
        </Text>
        <Flex
          justifyContent="space-evenly"
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={12}
          pt={1}
          pb={6}
        >
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/global-certificate.jpg"
            }
            alt="global-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/ciolook-certificate.jpg"
            }
            alt="ciolook-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
        <Container centerContent>
        <Heading
            color="brand.500"
            fontSize={{ md: 33, base: 21 }}
            mx="auto"
            align={"center"}
            my={3}
          >
            LICENSES & AFFILIATIONS
          </Heading>
        </Container>

        <Container centerContent>
          <Image
            src={"./Mango/Home/apeda.jpg"}
            alt="ciolook-certificate"
            w={"25%"}
          />
        </Container>

        <Container mt={3}>
          <Image src="./Mango/Home/store_details.png" w="100%" alt="" />
        </Container>
        <Container maxW={"3xl"} centerContent>
          <Image src="./Mango/Home/mango_key_point.jpg" />
        </Container>
      </Container>
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
