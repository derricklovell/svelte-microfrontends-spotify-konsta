Konsta UI Svelte

Konsta UI - is a free and open source mobile UI components framework built with Tailwind CSS.

<script>
  import { App, Page, Navbar, Block } from 'konsta/svelte';
</script>
<App theme="ios">
  <Page>
    <Navbar title="My App" />

    <Block strong>Hello world!</Block>
  </Page>
</App>
It is designed to develop hybrid mobile apps, Web Native apps or web apps with iOS & Android native look and feel.

It is highly recommended for you to be familiar with basics of both Tailwind CSS and Svelte before getting started.

Current documentation doesn't cover the process of compilation of Konsta UI app to Cordova or Capacitor app. It is about Konsta UI and how to use all of its components. To learn more about how to compile your app to hybrid Cordova or Capacitor app that can be released at iOS and Google Play store refer to their official documentations.

Konsta UI Kitchen Sink is also a great place to get started, it has a lot examples for all Konsta UI components and covers most of aspects.

Ok, so first of all we need to learn how to install Konsta UI


Installation

Contents

Install Konsta UI
Add Konsta UI Theme
Roboto Font
Usage
Install Konsta UI

We assume you already have a configured project with Svelte and Tailwind CSS .

At first, we need to install the Konsta UI library:

npm i konsta
Add Konsta UI Theme

Then, we need to import Konsta UI theme file in your main CSS file:

@import 'tailwindcss';
/* import Konsta UI theme */
@import 'konsta/svelte/theme.css';
Roboto Font

Konsta UI uses system font for iOS theme and Roboto font for Material Design theme.

If you develop a web app, you need to Roboto font to your app to display it correctly.

For example, it can be added from Google Fonts:

In HTML:

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
  rel="stylesheet"
/>
Or in CSS:

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
Usage

After installation process is done let's check how to use Konsta UI components in our Svelte application.

Usage

After installation process is done we can start using Konsta UI components in our Svelte application.

Contents

Components
App Component
Konsta UI Provider
Components

The process is pretty straightforward and we need to import Konsta UI Svelte components from konsta/svelte:

<script>
  /* App.svelte */
  import { Block, Button } from 'konsta/svelte';
</script>

...
<Block>
  <p>This is block with text</p>
</Block>
<Block class="space-y-4">
  <p>Here comes the button</p>
  <button>Action</button>
</Block>
...
App Component

We suppose you use Konsta UI components with some other framework (like Framework7.

But if you use only Konsta UI then we need to wrap all our components with Konsta UI's App component.

In App component we can define global theme (iOS or Material) and other useful globals:

<script>
  import { App, Page, Navbar, Block } from 'konsta/svelte';
</script>

<App theme="ios">
  <Page>
    <Navbar title="My App" />
    <Block>
      <p>Here comes my app</p>
    </Block>
  </Page>
</App>
Konsta UI Provider

And if you do use Konsta UI with other frameworks, we still can (and should) specify Konsta UI's globals (like theme). For this case we need to use KonstaProvider.

We also need to add k-ios or k-material class to the app's root element.

<script>
  /* App.svelte */
  // we use main App and Router components from Framework7
  import { App, View, Page, Navbar } from 'framework7-svelte';
  // we use KonstaProvider instead
  import { KonstaProvider, Block, Button } from 'konsta/svelte';
</script>

<!-- Wrap our app with KonstaProvider -->
<KonstaProvider theme="ios">
  <!-- We add extra `k-ios` class to the app root element -->
  <App theme="ios" class="k-ios">
    <View>
      <Page>
        <Navbar title="My App" />
        <!-- Konsta UI components -->
        <Block>
          <p>Here comes my app</p>
        </Block>
        <Block class="space-y-4">
          <p>Here comes the button</p>
          <button>Action</button>
        </Block>
      </Page>
    </View>
  </App>
</KonstaProvider>


