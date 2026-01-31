import axios from "axios";
import { Book } from "@/shared/types/product";

const BASE_URL = "https://openlibrary.org";

export const booksApi = {
  searchBooks: async (query: string, maxResults = 20): Promise<Book[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/search.json`, {
        params: {
          title: query,
          limit: maxResults,
        },
      });

      const books = await Promise.all(
        (response.data.docs || []).map(
          async (item: {
            key: string;
            title: string;
            author_name?: string[];
            description?: string | { value: string };
            publisher?: string[];
            first_publish_year?: number;
            cover_i?: number;
            edition_count?: number;
          }) => {
            let rating: number | undefined;
            let ratingCount: number | undefined;

            try {
              const ratingsResponse = await axios.get(
                `${BASE_URL}${item.key}/ratings.json`,
              );
              if (ratingsResponse.data.summary.average) {
                rating =
                  Math.round(ratingsResponse.data.summary.average * 100) / 100;
                ratingCount = ratingsResponse.data.summary.count;
              }
            } catch {}

            return {
              id: item.key,
              title: item.title,
              authors: item.author_name,
              description:
                typeof item.description === "string"
                  ? item.description
                  : item.description?.value,
              publisher: item.publisher?.[0],
              publishedDate: item.first_publish_year?.toString(),
              editionCount: item.edition_count,
              rating,
              ratingCount,
              imageLinks: item.cover_i
                ? {
                    thumbnail: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
                  }
                : undefined,
            };
          },
        ),
      );

      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  },
};
