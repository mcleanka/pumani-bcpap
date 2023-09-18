# Pumani bCPAP Structure

React Native is an open-source mobile application framework developed by Facebook that allows you to build mobile apps using JavaScript and React. With React Native, you can create mobile apps for both iOS and Android platforms from a single codebase. It offers several advantages including

- Cross-Platform Development: React Native enables you to write code once and run it on both iOS and Android platforms. This saves development time and resources compared to building separate native apps for each platform.

- JavaScript / Typescript and React: React Native uses the same declarative and component-based approach as React.

- Reusable Components: React Native allows you to create reusable UI components that can be shared across different parts of your app or even between multiple apps.

##### In this typical React Native app project structure, the following folder names will contain specific types of files and code:

**android**: This folder contains all the Android-specific code and resources for your React Native app. It includes the AndroidManifest.xml file, Java or Kotlin source code, and resource files (e.g., drawables, layouts) necessary for building and configuring your Android app.

**components**: The components folder is where you organize and store your custom user interface (UI) components that can be reused across different screens or parts of your app. These components help maintain consistency and modularity in your code.

**ios**: Similar to the Android folder, the ios folder contains all the iOS-specific code and resources for your React Native app. It includes Xcode project files, Swift or Objective-C source code, and asset files specific to iOS.

**navigation**: The navigation folder typically holds the configuration and implementation of your app's navigation. This can include setting up a stack navigator, tab navigator, or any other navigation structure your app requires. It helps manage the flow between different screens or sections of your app.

**provider**: The provider folder may contain context providers for state management

**screens**: The screens folder is where you define the individual screens or views of your app. Each screen typically corresponds to a specific part of your app's user interface. It's where you write the code for rendering and managing the content of those screens.

**theme**: The theme folder can include files related to styling and theming your app. It may contain style definitions, color schemes, or any other assets used for consistent styling across your app.

**App.tsx**: This file is usually the entry point of your React Native app. It's where you set up your app's main components, such as navigation, providers, and any initial configurations. It's the starting point of your app's JavaScript or TypeScript code.

##### During the development of a React Native app, several folders are commonly used to organize and manage your project. Here's a breakdown of the most commonly used folders and their purposes:

- **components**: This is where you should store your reusable React components. Organizing your components in this folder helps keep your codebase clean and maintainable.

- **navigation**: The navigation folder is commonly used to manage app navigation and routing. You might find files related to navigation stacks, tabs, and routing configurations here.

- **screens**: This folder typically contains individual screen components for your app. Each screen corresponds to a specific view or screen in your application.

- **assets**: The assets folder is used to store static assets like images, fonts, and other resources that your app requires.

- **styles or theme**: This folder is where you can store your global styles, themes, or style-related utility functions. It helps keep your app's styling organized and consistent.

- **App.tsx** or **index.js**: This is typically the entry point of your app. It's where you set up the initial components, navigation, and any other app-level configurations.

```
While these are some of the commonly used folders in a React Native project, keep in mind that the project structure can vary depending on personal preferences and project requirements. It's essential to maintain a clear and organized structure to make your codebase more manageable as your app grows.
```
