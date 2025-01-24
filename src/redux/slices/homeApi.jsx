import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../setup/axiosClient";

export const initializeAppData = createAsyncThunk("app/initializeData", async (_, { rejectWithValue }) => {
    try {
        const [
            bannersResponse, 
            upperSectionResponse, 
            tryOurNewProductResponse,
            mustTryResponse, 
            allTimeBestSellerResponse, 
            lowerSectionResponse1,
            blogsResponse, 
            statisticsResponse, 
            lowerSectionResponse2
        ] = await Promise.all([
            client.get("/ecommerce/banners/?sequence=Upper"),
            client.get("/naturalmango-section/?type=Upper"),
            client.get("/newarrival/list"),
            client.get("/musttry/list"),
            client.get("/bestofalltime/list"),
            client.get("/naturalmango-section/?type=Lower"),
            client.get("/home/blogs/"),
            client.get("/statistics-section/"),
            client.get("/lower-section/"),
        ]);

        return {
            banners: bannersResponse.data.banner || [],
            upperSection: upperSectionResponse.data.data || [],
            newArrival: tryOurNewProductResponse.data.data || [],
            mustTry: mustTryResponse.data.data || [],
            bestSeller : allTimeBestSellerResponse.data.data || [],
            lowerSection1: lowerSectionResponse1.data.data || [],
            blogs: blogsResponse.data.blogs || [],
            statistics: statisticsResponse.data.data || {},
            lowerSection2: lowerSectionResponse2.data.data || [],
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const bannerSlice = createSlice({
    name: "home",
    initialState : {
            banners: [],
            upperSection: {
                naturalMangoSection: [],
                varietySection: [],
                aboutSection: [],
                anotherImage: [],
            },
            newArrival: [],
            mustTry: [],
            bestSeller: [],
            lowerSection1: {
               licensesSection: [],
                weAreAtSection: [],
                ethicalSection: [],
            },
            blogs: [],
            statisticsSection: {},
            lowerSection2: {
                awardsSection: [],
                servicesSection: [],
                availableSection: [],
            },
            loading: false,
            error: null,
            hasFetched: false,
        },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppData.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeAppData.fulfilled, (state, action) => {
                state.loading = false;
                const { banners, upperSection, newArrival, mustTry, bestSeller, lowerSection1, blogs, statistics, lowerSection2 } = action.payload;
                
                state.banners = banners;

                // Organize upperSection data
                state.upperSection = {
                    naturalMangoSection: upperSection.filter((section) => section.id === 1),
                    varietySection: upperSection.filter((section) => section.id === 2),
                    aboutSection: upperSection.filter((section) => section.id === 3),
                    anotherImage: upperSection.filter((section) => section.id === 4),
                };

                state.newArrival = newArrival;
                state.mustTry = mustTry;
                state.bestSeller = bestSeller;
                
                // Organize lowerSection1 data
                state.lowerSection1 = {
                    licensesSection: lowerSection1.filter((section) => section.id === 5),
                    weAreAtSection: lowerSection1.filter((section) => section.id === 6),
                    ethicalSection: lowerSection1.filter((section) => section.id === 7),
                };
                
                state.blogs = blogs;
                state.statisticsSection = statistics;
                
                // Organize lowerSection2 data
                state.lowerSection2 = {
                    awardsSection: lowerSection2.filter((section) => section.id === 1),
                    servicesSection: lowerSection2.filter((section) => section.id === 2),
                    availableSection: lowerSection2.filter((section) => section.id === 3),
                };
                state.hasFetched = true;
            })
            .addCase(initializeAppData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bannerSlice.reducer;
