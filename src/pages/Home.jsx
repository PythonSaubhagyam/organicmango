import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";
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
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";
import LoginModal from "../components/LoginModal";
import checkLogin from "../utils/checkLogin";


export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [homeData, setHome] = useState({});
  const [aboutSection, setAboutSection] = useState();
  const [varietySection, setVarietySection] = useState();
  const [naturalMangoSection, setNaturalMangoSection] = useState();
  const [anotherImage, setAnotherImage] = useState();
  const [awardsSection, setAwardSection] = useState();
  const [licensesSection, setLicensesSection] = useState();
  const [weAreAtSection, setWeAreAtSection] = useState();
  const [ethicalSection, setEthicalSection] = useState();
  const [statisticsSection, setStatisticsSection] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(
    sessionStorage.getItem("hasShownPopup")
  );
  const loginInfo = checkLogin();
  // let [isFull] = useMediaQuery("(max-width:1920px)");
  const [blogs, setBlogs] = useState([]);
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };

    init();
    getBanners();
    getBlogs();

    getStatisticsSection();
    getLowerSection();
    getUpperSection();
    if (showPopup === null && !loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, []);

  async function getBanners() {
    setLoading(true);
    try {
      const response = await client.get("/ecommerce/banners/?sequence=Upper");

      if (response.data.status === true) {
        setBanners(response?.data?.banner);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
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

  async function getUpperSection() {
    const promise1 = await client.get("/naturalmango-section/?type=Upper");

    const promise2 = await client.get("/naturalmango-section/?type=Lower");

    Promise.all([promise1, promise2])
      .then(function (responses) {
        if (responses[0].data.status === true) {
          const naturalMango = responses[0].data.data?.filter(
            (section) => section.id === 1
          );
          const variety = responses[0].data.data?.filter(
            (section) => section.id === 2
          );
          const about = responses[0].data.data?.filter(
            (section) => section.id === 3
          );
          const anotherImages = responses[0].data.data?.filter(
            (section) => section.id === 4
          );

          setAboutSection(about);
          setNaturalMangoSection(naturalMango);
          setVarietySection(variety);
          setAnotherImage(anotherImages);
        }

        if (responses[1].data.status === true) {
          const licenses = responses[1].data.data?.filter(
            (section) => section.id === 5
          );
          const weAreAt = responses[1].data.data?.filter(
            (section) => section.id === 6
          );
          const ethical = responses[1].data.data?.filter(
            (section) => section.id === 7
          );

          setLicensesSection(licenses);
          setWeAreAtSection(weAreAt);
          setEthicalSection(ethical);
        }

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }

  async function getStatisticsSection() {
    const params = {};
    const response = await client.get("/statistics-section/", {
      params: params,
    });
    if (response.data.status === true) {
      setStatisticsSection(response?.data?.data);
    }
  }
  async function getLowerSection() {
    const params = {};
    const response = await client.get("/lower-section/", {
      params: params,
    });
    if (response.data.status === true) {
      const ourAwardsSection = response.data.data?.filter(
        (section) => section.id === 1
      );

      setAwardSection(ourAwardsSection);
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
      <Container maxW={"container.xl"} px={0}>
        {loading === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={banners?.length > 0 && banners} />
        )}
      </Container>

      {naturalMangoSection?.length > 0 &&
        naturalMangoSection[0]?.is_visible_on_website === true && (
          <>
            {" "}
            <Container
              maxW={{ md: "3xl", base: "xl" }}
              centerContent
              mb={5}
              mt={10}
            >
              <Image src={naturalMangoSection[0]?.image} alt="" />
            </Container>
            <Container maxW={"6xl"} mb={8} mt={2} px={0}>
              <Text
                color={"text.300"}
                textAlign={{ md: "center", base: "justify" }}
                justifyContent={"justify"}
                px={{ base: 15, lg: 20 }}
                fontSize={{ base: "sm", lg: "md" }}
              >
                {naturalMangoSection[0]?.description}
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
            </Container>{" "}
          </>
        )}
      {varietySection?.length > 0 &&
        varietySection[0]?.is_visible_on_website === true && (
          <>
            {" "}
            <Container centerContent mt={12}>
              <Image src={varietySection[0]?.image} w={"50%"} alt="" />
            </Container>
            <Container maxW={"6xl"} centerContent my={3}>
              {varietySection[0]?.images?.length > 0 &&
                varietySection[0]?.images?.map((product) => (
                  <Card
                    w={{ base: "80vw", sm: "3xs", lg: "2xs" }}
                    border="1px"
                    mx={2}
                    mb={5}
                    borderColor="brand.100"
                    borderRadius={"lg"}
                    onClick={() => {
                      window.location.href = `/products/${product.product}`;
                      // navigate(),
                      //   window.scrollTo({
                      //     top: 0,
                      //     left: 0,
                      //     behavior: "smooth",
                      //   });
                    }}
                    cursor={"pointer"}
                  >
                    <CardBody backgroundColor={"white"} borderRadius="lg">
                      <Image
                        src={product.image ? product.image : product.image1}
                        alt={product.name}
                        borderRadius="lg"
                        boxSize="150px"
                        objectFit={"contain"}
                        mx="auto"
                      />
                    </CardBody>
                    <CardFooter
                      align={"center"}
                      py={3}
                      flexDirection="column"
                      backgroundColor={"bg.500"}
                      borderBottomRadius="lg"
                    >
                      <Box
                        h="80px"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Heading
                          size="sm"
                          mb={3}
                          noOfLines={3}
                          fontWeight="500"
                          title={product.product_name}
                        >
                          {product.product_name}
                        </Heading>
                      </Box>
                      <Button
                        as={Link}
                        to={product.id && `/products/${product.product}`}
                        fontSize="sm"
                        w={{ base: "100%", lg: "80%" }}
                        mx="auto"
                        backgroundColor={"brand.500"}
                        borderColor={"brand.100"}
                        color="white"
                        _hover={{ backgroundColor: "brand.900" }}
                      >
                        View Product
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              {/* <ProductListSection
          // title="New Arrival Gir Gauveda"
          loading={loading}
          products={new_arrival_gir_gauveda}
        /> */}
            </Container>{" "}
          </>
        )}
      {aboutSection?.length > 0 &&
        aboutSection[0]?.is_visible_on_website === true && (
          <Container
            maxW={"container.xl"}
            px={{ md: 20, base: 8 }}
            centerContent
          >
            <Grid
              templateColumns={{
                md: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={6}
            >
              <GridItem colSpan={1}>
                <Text color={"text.500"} fontSize={{ md: "3xl", base: "2xl" }}>
                  {aboutSection[0]?.label}
                </Text>
                <Text
                  color={"text.300"}
                  textAlign={"justify"}
                  mt={3}
                  fontSize={"md"}
                >
                  {aboutSection[0]?.description}
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Image src={aboutSection[0]?.image} alt="" />
              </GridItem>
            </Grid>
          </Container>
        )}

      {anotherImage?.length > 0 &&
        anotherImage[0]?.is_visible_on_website === true && (
          <>
            {" "}
            <Container centerContent mt={{ base: 4, md: 8, lg: 12 }}>
              <Image
                src={
                  anotherImage[0]?.images?.length > 0 &&
                  anotherImage[0]?.images[0]?.image
                }
                alt=""
                w={{ md: "100%", base: "70%" }}
              />
            </Container>
            <Container
              maxW={"container.xl"}
              px={0}
              mt={{ base: 4, md: 8, lg: 12 }}
            >
              <Image
                src={
                  anotherImage[0]?.images?.length > 0 &&
                  anotherImage[0]?.images[1]?.image
                }
                alt=""
              />
            </Container>
            <Container maxW={"container.xl"} px={0} mt={4}>
              <Image
                src={
                  anotherImage[0]?.images?.length > 0 &&
                  anotherImage[0]?.images[2]?.image
                }
                alt=""
              />
            </Container>{" "}
          </>
        )}

      <Container maxW={"container.xl"}>
        <Heading color="brand.500" size="lg" mx="auto" align={"center"} mt={5}>
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

      {statisticsSection?.length > 0 && (
        <Container backgroundColor={"bg.500"} maxW={"container.xl"} py={2}>
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
            {statisticsSection?.length > 0 &&
              statisticsSection?.map((data) => (
                <Stat>
                  <StatNumber fontSize={{ base: "3xl", md: "3xl" }}>
                    {data?.value}
                  </StatNumber>
                  <StatHelpText color="gray.600">{data?.name}</StatHelpText>
                </Stat>
              ))}
          </SimpleGrid>
        </Container>
      )}
      {awardsSection?.length > 0 &&
        awardsSection[0]?.is_visible_on_website === true && (
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
                {awardsSection?.length > 0 && awardsSection[0]?.label}
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
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[0]?.image
                }
                alt="global-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
              <LazyLoadImage
                src={
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[1]?.image
                }
                alt="ciolook-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </Flex>
          </Container>
        )}
      {licensesSection?.length > 0 &&
        licensesSection[0]?.is_visible_on_website === true && (
          <Container centerContent>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 21 }}
              mx="auto"
              align={"center"}
              my={3}
            >
              {licensesSection[0]?.label}
            </Heading>

            <Image
              src={licensesSection[0]?.images?.length > 0 && licensesSection[0]?.images[0]?.image}
              alt="ciolook-certificate"
              w={"25%"}
            />
          </Container>
        )}
     {weAreAtSection?.length > 0 && weAreAtSection[0]?.is_visible_on_website === true && <Container mt={3}>
        <Image src={weAreAtSection[0]?.image} w="100%" alt="" />
      </Container>}
      {ethicalSection?.length > 0 && ethicalSection[0]?.is_visible_on_website === true &&<Container maxW={"3xl"} centerContent>
        <Image src={ethicalSection[0]?.image} />
      </Container>}
      {!checkLogin().isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <ScrollToTop />
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
