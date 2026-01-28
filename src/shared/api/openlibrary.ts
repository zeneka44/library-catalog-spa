import axios from "axios";
import { Book } from "@/shared/types/product";

const BASE_URL = "https://openlibrary.org";

export const googleBooksApi = {
  searchBooks: async (query: string, maxResults = 20): Promise<Book[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/search.json`, {
        params: {
          title: query,
          limit: maxResults,
        },
      });

      return (response.data.docs || []).map(
        (item: {
          key: string;
          title: string;
          author_name?: string[];
          description?: string | { value: string };
          publisher?: string[];
          first_publish_year?: number;
          cover_i?: number;
        }) => ({
          id: item.key,
          title: item.title,
          authors: item.author_name,
          description:
            typeof item.description === "string"
              ? item.description
              : item.description?.value,
          publisher: item.publisher?.[0],
          publishedDate: item.first_publish_year?.toString(),
          imageLinks: item.cover_i
            ? {
                thumbnail: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
              }
            : undefined,
        }),
      );
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  },
};
