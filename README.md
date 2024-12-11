# KollektivXplorer

[KollektivXplorer](https://kollektivxplorer-app.vercel.app/) is a Single Page Application (SPA) designed for seamless navigation through the KollektivX archive of rare and valuable records.

KollektivX was a platform where music enthusiasts and diggers could collaboratively crowdfund the purchase of rare and expensive records on Discogs. After acquiring these records, the platform digitized them, providing contributors with their digital copies. Over time, KollektivX and its community collected an impressive archive of 2,258 rare records.

KollektivXplorer serves as a dedicated tool to explore this unique archive.



---

## Features

### 1. **Search Bar**
Search for records by typing in information such as:
- Artist
- Title
- Label
- Genre
- Style
- Country

### 2. **Sortable Table Headers**
- Many table headers are sortable by clicking on them.
- Arrows (up and down) indicate the current sorting direction.

### 3. **Played Column**
- The "Played" column tracks whether a record has been played.
- This data is stored locally in your browser’s `localStorage`.

### 4. **Media Player**
- Each record row features a play button.
- Clicking the play button triggers an API request to Discogs, fetching the latest YouTube videos of the tracks on the record.
- Add multiple records to the player, switch between them, or remove them as desired.

### 5. **External Links**
- Artists, Titles, and Labels are clickable links leading to their respective Discogs pages.

---

## Built With

- **Vite**: For fast and efficient development.
- **Vue 3**: The progressive JavaScript framework.
- **Vuetify**: Material Design Component Framework.

---

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm package manager

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:escapist-berlin/kollektivxplorer-app.git
   cd kollektivxplorer-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser.

---

## Usage

1. Use the search bar to filter records based on your preferences.
2. Sort columns by clicking on the headers to organize the archive.
3. Play records using the media player and explore the tracks via YouTube links.
4. Click on the Artist, Title, or Label to visit their Discogs pages for more details.

---

## Roadmap
- TBA...

---

## Contributing
Pull requests are welcome! For significant changes, please open an issue first to discuss what you would like to change.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy exploring the world of rare and extraordinary records with KollektivXplorer!

