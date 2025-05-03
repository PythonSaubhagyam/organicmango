import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";
import ProductListSection from "../components/ProductListSection";
import MetaHome from "../components/MetaHome";
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

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
import {
  useNavigate, NavLink as RouterLink, Link as ReactRouterLink,
} from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";
import LoginModal from "../components/LoginModal";
import checkLogin from "../utils/checkLogin";
import { useDispatch, useSelector } from "react-redux";
import { initializeAppData } from "../redux/slices/homeApi";


export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(
    sessionStorage.getItem("hasShownPopup")
  );
  const loginInfo = checkLogin();
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  const [countUp, setCountUp] = useState(false)


  const dispatch = useDispatch();
  const {
    banners,
    upperSection,
    newArrival,
    mustTry,
    bestSeller,
    lowerSection1,
    blogs,
    statisticsSection,
    lowerSection2,
    loading,
    hasFetched,
  } = useSelector((state) => state.home);

  const {
    naturalMangoSection,
    varietySection,
    aboutSection,
    anotherImage,
  } = upperSection;

  const {
    licensesSection,
    weAreAtSection,
    ethicalSection,
  } = lowerSection1;

  const {
    awardsSection,
    servicesSection,
    availableSection,
  } = lowerSection2;

  useEffect(() => {
    if (!hasFetched) {
      dispatch(initializeAppData());
    }
  }, [dispatch, hasFetched]);


  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };
    init();
    if (showPopup === null && !loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, []);


  const pageUrl = "/";
  return (
    <>
      <MetaHome pageUrl={pageUrl} />

      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      {banners.length > 0 &&
        < Container maxW={"container.xl"} px={0}>
          {loading === true ? (
            <Skeleton h={489}></Skeleton>
          ) : (
            <Carousel banners={banners?.length > 0 && banners} />
          )}
        </Container >
      }

      {
        naturalMangoSection?.length > 0 &&
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
              as={"h1"}
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
        )
      }
      {
        varietySection?.length > 0 &&
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
                    as={ReactRouterLink}
                    to={`/products/${product.product}/${product.product_name.replace(/\s+/g, "-")}`}
                    cursor={"pointer"}
                  >
                    <CardBody backgroundColor={"white"} borderRadius="lg">
                      <Image
                        src={product.image ? product.image : product.image1}
                        alt={product.name}
                        borderRadius="lg"
                        boxSize="200px"
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
                        as={"h1"}
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
                        to={product.id && `/products/${product.product}/${product.product_name.replace(/\s+/g, "-")}`}
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
        )
      }
      {
        aboutSection?.length > 0 &&
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
                <Text as={"h1"} color={"text.500"} fontSize={{ md: "3xl", base: "2xl" }}>
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
        )
      }

      {
        anotherImage?.length > 0 &&
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
              centerContent
            >
              <Image
                src={
                  anotherImage[0]?.images?.length > 0 &&
                  anotherImage[0]?.images[1]?.image
                }
                alt=""
                width={"100%"}
              />
            </Container>
            <Container centerContent maxW={"container.xl"} px={0} mt={4}>
              <Image
                src={
                  anotherImage[0]?.images?.length > 0 &&
                  anotherImage[0]?.images[2]?.image
                }
                alt=""
                width={"100%"}
              />
            </Container>{" "}
          </>
        )
      }

      <Container maxW={"container.xl"}>
        <Heading as={"h1"} color="brand.500" size="lg" mx="auto" align={"center"} mt={5}>
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
                    as={ReactRouterLink} to={`/blogs/${blog.id}/`}
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

      {
        statisticsSection?.length > 0 && (
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
                    <StatNumber
                      color="text.300"
                      fontSize={{ base: "3xl", md: "3xl" }}
                    >
                      <ScrollTrigger onEnter={() => setCountUp(true)}>
                        {countUp ? (
                          <CountUp
                            start={0}
                            end={Number(data.value.replace(/[^\d]/g, ""))}
                            duration={1}
                            delay={0}
                          />
                        ) : null}
                        {data?.name === "Positive Feedback" ? "+%" : data?.name === "Generation of Farmers" ? "th" : "+"}
                      </ScrollTrigger>
                    </StatNumber>
                    <StatHelpText color="gray.600">{data?.name}</StatHelpText>
                  </Stat>
                ))}
            </SimpleGrid>
          </Container>
        )
      }
      {
        awardsSection?.length > 0 &&
        awardsSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "container.xl" }}>
            <Box
              w="100%"
              backgroundSize="100%"
              backgroundPosition="50% 100%"
              backgroundRepeat={"no-repeat"}
            >
              <Heading
              as={"h1"}
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
        )
      }
      {
        licensesSection?.length > 0 &&
        licensesSection[0]?.is_visible_on_website === true && (
          <Container centerContent>
            <Heading
            as={"h1"}
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
        )
      }
      {
        weAreAtSection?.length > 0 && weAreAtSection[0]?.is_visible_on_website === true && <Container mt={3}>
          <Image src={weAreAtSection[0]?.image} w="100%" alt="" />
        </Container>
      }
      {
        ethicalSection?.length > 0 && ethicalSection[0]?.is_visible_on_website === true && <Container maxW={"3xl"} centerContent>
          <Image src={ethicalSection[0]?.image} />
        </Container>
      }
      {
        !checkLogin().isLoggedIn && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )
      }
      <ScrollToTop />
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
