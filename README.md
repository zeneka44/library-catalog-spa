# Library Catalog SPA

A web application for a book catalog that allows users to view, add, and manage their book collection with a favorites feature.

**Stack:** Next.js 14, React 18, TypeScript, Redux Toolkit, CSS Modules

Live preview: `https://zeneka44.github.io/library-catalog-spa`

## Installation and Launch

### Installing Dependencies

```bash
npm install
```

### Running in Development Mode

```bash
npm run dev
```

The application is available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx      # Home page
│   ├── products/     # Book list page
│   └── create-product/  # Add book page
├── features/         # Application business logic
│   ├── products/
│   │   ├── slice.ts     # Redux slice
│   │   └── selectors.ts # Redux selectors
│   └── ui/           # UI components
│       ├── ProductCard.tsx
│       ├── ProductsList.tsx
│       └── ProductsFilters.tsx
├── shared/           # Shared code
│   ├── api/          # API client
│   └── types/        # TypeScript types
├── store/            # Redux store setup
└── styles/           # Global styles
```

## Main Features

- **Catalog View**: Loading and displaying books from Open Library API
- **Adding Books**: Form with validation for adding new books
- **Favorites**: Ability to add/remove books to/from favorites
- **Filtering**: Filtering by status (all books / favorites)
- **Validation**: Checking all fields when adding a book in real time

## Data Types

### Book

Interface for representing a book in the application:

```typescript
interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  publisher?: string;
  publishedDate?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  isLiked: boolean;
}
```

## Application Architecture

The application is built using modern patterns and principles:

### Redux Layer (State Management)

**File:** `src/features/products/slice.ts`

Manages the catalog state:
- `items` - array of all books in the catalog
- `filter` - current filter ("all" or "liked")
- `isLoading` - loading status

**Actions:**
- `setProducts` - set all books
- `addProduct` - add a new book
- `deleteProduct` - delete a book
- `toggleLike` - toggle favorite status
- `setFilter` - set filter

### Components

#### ProductsList
Responsible for displaying the list of books in a grid of cards. Uses Redux selector to get the filtered list of books.

#### ProductCard
Book card component displaying:
- Book cover
- Title
- Author
- Add to favorites button
- View details option

#### ProductsFilters
Filter component with buttons to select:
- All books
- Favorite books

Also responsible for loading the book catalog from API on first open.

#### CreateProductForm
Form for adding a new book with fields:
- Book title (required, minimum 3 characters)
- Author (required, minimum 2 characters)
- Description (required, minimum 10 characters)
- Publication date (required, cannot be in the future)

The form has real-time validation with error message display.

## Validation

Validation is performed through the `validateField` function, which:
- Checks field requirement
- Checks minimum value length
- For publication date, checks that it is not in the future

Errors are displayed under the field and highlight it with a red border when a validation error occurs.

## API Integration

### Open Library API

The application uses Open Library API to load the book catalog:
- Endpoint: `https://openlibrary.org/search.json`
- Loads 20 books of the "fiction" genre on application open

**File:** `src/shared/api/openlibrary.ts`

## Component Interaction

1. **Loading**: On `ProductsFilters` mount, loads books if the list is empty
2. **Adding**: User fills the form on `/create-product` and submits data
3. **Redux**: New book is added to Redux state via `addProduct`
4. **Display**: `ProductsList` automatically updates and shows the new book
5. **Filtering**: `selectFilteredProducts` selector filters books by status

## Main Pages

### `/`
Home page with redirect to `/products`

### `/products`
Main catalog page with:
- "Booklet" title
- "Add book" button
- Filters
- Grid of book cards

### `/create-product`
Form for adding a new book with:
- Input fields with validation
- "Add book" button
- Cancel button (return to catalog)
- Error messages

## Deployment

```bash
npm run build
```

Built files are located in the `.next` folder

## Author

Evgeniia Fedorova
