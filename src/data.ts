// TODO:  Add a property image to this example
// Add a results list with pageinfo

export interface PropertyData {
    property : {
        id: string,
        address: {
            shortAddressDisplay: string,
        },
        attributes: {
            beds: number,
            baths: number,
            carSpaces: number
        }
    },
    propertyDetailsPage: {
        slug: string
    }
}

export const createPropertyData = (): PropertyData =>({
    property : {
        id: String(Math.floor(Math.random() * 1000)),
        address: {
            shortAddressDisplay: "7 Westview Court, Springvale South",
        },
        attributes: {
            beds: 1,
            baths: 2,
            carSpaces: 3
        }
    },
    propertyDetailsPage: {
        slug: "details/7-westview-court-springvale-south-3172-vic"
    }
});


export interface PropertyResultsData {
    results: PropertyData[];
    pageInfo: {
        totalResultsCount: number;
        hasMore: boolean;
    }
}

export const createPropertyResultsData = (): PropertyResultsData =>({
    results: [createPropertyData(), createPropertyData(), createPropertyData()],
    pageInfo: {
        totalResultsCount: 100,
        hasMore: true
    }
});