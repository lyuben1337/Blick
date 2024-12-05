# Blick

This app allows users to import images, adjust their brightness and contrast, and export the edited images. The app is built with **React Native** and **Expo**, utilizing image processing with `gl-react`.

---

## Features

- **Import Images:** Select images from your library using the image picker.
- **Edit Images:** Adjust image brightness and contrast in real-time using sliders.
- **Preview Changes:** Live preview of the edited image using GLSL shaders.
- **Export Images:** Save and share edited images.
- **Localized UI:** Supports multiple languages using `react-i18next`.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   expo start
   ```

---

## Usage

1. **Import an Image:**
   - Press the "Import Photo" button.
   - Select an image from your gallery.

2. **Edit the Image:**
   - Use the sliders to adjust **Brightness** and **Contrast**.

3. **Save or Share:**
   - Press the export icon to save or share your edited image.

4. **Exit Editing:**
   - Press the exit icon to return to the home screen.

---

## File Structure

- `ImageViewer`: Displays the selected image and provides navigation to the editor.
- `Saturate`: A GLSL shader for applying brightness and contrast adjustments.
- `ImageParameterSlider`: Slider components for controlling image properties.
- `ThemedView` and `ThemedText`: Shared components for consistent theming.

---

## Screenshots

<div align="center"> <img src="https://github.com/user-attachments/assets/e86a1e24-4820-4873-b12a-14b47f4b3259" alt="Home Screen" width="30%"> <img src="https://github.com/user-attachments/assets/43a9d6e9-dedd-4a99-b098-ec069ee4d736" alt="Edit Screen" width="30%"> <img src="https://github.com/user-attachments/assets/895894c4-22c2-4421-a6c1-a195410a7839" alt="Export Screen" width="30%"> </div>

## Dependencies

- **Expo Modules:** `expo-image`, `expo-image-picker`, `expo-sharing`, `expo-file-system`
- **React Native Libraries:** `react-native-view-shot`, `react-native-gesture-handler`
- **GL React:** `gl-react`, `gl-react-expo`
- **Localization:** `react-i18next`
