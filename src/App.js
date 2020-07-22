import React, { useCallback, useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {useTranslation} from "react-i18next";

import { AppProvider, Frame, Icon, Navigation, TopBar, VisuallyHidden } from '@shopify/polaris';
import { ArrowLeftMinor, CirclePlusMajorMonotone, HintMajorMonotone, PopularMajorTwotone, LanguageMinor, ProfileMajorMonotone } from '@shopify/polaris-icons';

import CreatePostContainer from './components/CreatePostContainer';
import PostList from './components/PostList';

import unsplash from './api/unsplash';
import debounce from './helpers/debounce';

import './App.css';
import Showcase from './components/Showcase';

function App() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [posts, setPosts] = useState([]);

  const [t, i18n] = useTranslation('common');

  const debounceOnChange = React.useCallback(debounce((value) => getPosts(value), 400), []);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    [],
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  const getPosts = async (query) => {
    const response = await unsplash.get('/search/photos', {
      params: {
        query,
        per_page: 40,
      }
    });
    setPosts(response.data.results);
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: 'Profile', icon: ProfileMajorMonotone }],
        },
        {
          items: [{ content: 'Logout', icon: ArrowLeftMinor }],
        },
      ]}
      name="Daniel Wu"
      detail="wuon@protonmail.com"
      initials="DW"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <></>
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={(value) => debounceOnChange(value)}
      placeholder={t('search')}
      showFocusBorder
    />
  );

  const Sidebar = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/popular',
            label: t('popular'),
            icon: PopularMajorTwotone,
          },
          {
            url: '/new',
            label: t('new'),
            icon: HintMajorMonotone,
          },
        ]}
      />
      <Navigation.Section
        items={[
          {
            url: '/create',
            label: t('create_post'),
            icon: CirclePlusMajorMonotone,
          },
        ]}
        separator
      />
    </Navigation>
  );

  const theme = {
    colors: {
      topBar: {
        background: '#FFFFFF',
        backgroundLighter: '#F4F6F8',
        backgroundDarker: '#DFE3E8',
        border: '#C4CDD5',
        color: '#212B36',
      },
    },
    logo: {
      width: 100,
      topBarSource: `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 216.283 60.52' fill='%23000'%3E%3Cpath d='M54.77,59.52V14.72h9.6v3.008q3.391-3.9,9.535-3.9a14.136,14.136,0,0,1,10.816,4.9,17.122,17.122,0,0,1,4.48,12,17.123,17.123,0,0,1-4.48,12,14.139,14.139,0,0,1-10.816,4.9q-6.144,0-9.535-3.9V59.52Zm11.744-34.5a7.634,7.634,0,0,0-2.144,5.7,7.7,7.7,0,0,0,2.111,5.7,7.58,7.58,0,0,0,5.5,2.112,7.47,7.47,0,0,0,5.472-2.112,7.632,7.632,0,0,0,2.144-5.7,7.634,7.634,0,0,0-2.144-5.7,8.146,8.146,0,0,0-10.944,0ZM151.666,40l8.321-4.736a5.214,5.214,0,0,0,5.44,3.776q3.456,0,3.456-1.984,0-.96-1.632-1.6a36.089,36.089,0,0,0-3.936-1.248,32.848,32.848,0,0,1-4.608-1.6,9.854,9.854,0,0,1-3.937-3.1,8.222,8.222,0,0,1-1.632-5.184,9.165,9.165,0,0,1,3.616-7.744,14.308,14.308,0,0,1,8.928-2.752,14.987,14.987,0,0,1,7.232,1.76,13.487,13.487,0,0,1,5.248,5.088l-8.192,4.416a4.723,4.723,0,0,0-4.288-2.816q-2.688,0-2.688,1.792,0,.96,1.632,1.568t3.937,1.216a35.6,35.6,0,0,1,4.608,1.568,9.334,9.334,0,0,1,3.936,3.168,9.061,9.061,0,0,1,1.632,5.536A8.92,8.92,0,0,1,174.9,44.96a16.256,16.256,0,0,1-9.473,2.656Q155.315,47.616,151.666,40ZM116.211,42.72a17.123,17.123,0,0,1-4.48-12,17.122,17.122,0,0,1,4.48-12,14.136,14.136,0,0,1,10.816-4.9q6.144,0,9.536,3.9V14.72h9.6v32h-9.6V43.712q-3.391,3.9-9.536,3.9A14.139,14.139,0,0,1,116.211,42.72Zm7.231-17.7a7.7,7.7,0,0,0-2.111,5.7,7.7,7.7,0,0,0,2.111,5.7,8.227,8.227,0,0,0,11.008,0,7.7,7.7,0,0,0,2.112-5.7,7.7,7.7,0,0,0-2.112-5.7,8.229,8.229,0,0,0-11.008,0ZM21.554,40l8.321-4.736a5.214,5.214,0,0,0,5.44,3.776q3.456,0,3.456-1.984,0-.96-1.632-1.6A36.089,36.089,0,0,0,33.2,34.208a32.848,32.848,0,0,1-4.608-1.6,9.854,9.854,0,0,1-3.937-3.1,8.222,8.222,0,0,1-1.632-5.184,9.165,9.165,0,0,1,3.616-7.744,14.308,14.308,0,0,1,8.928-2.752,14.985,14.985,0,0,1,7.231,1.76,13.487,13.487,0,0,1,5.248,5.088l-8.192,4.416a4.723,4.723,0,0,0-4.288-2.816q-2.688,0-2.688,1.792,0,.96,1.632,1.568t3.937,1.216a35.6,35.6,0,0,1,4.608,1.568,9.334,9.334,0,0,1,3.936,3.168,9.061,9.061,0,0,1,1.632,5.536,8.92,8.92,0,0,1-3.839,7.841,16.256,16.256,0,0,1-9.472,2.656Q25.2,47.616,21.554,40ZM.424,47.594v-4.54H9.05a2.7,2.7,0,0,0,2.043-.742,2.618,2.618,0,0,0,.711-1.891,2.721,2.721,0,0,0-.787-2.058,3.238,3.238,0,0,0-2.331-.757H.424v-4.54H15.557v4.54H14.135a5.022,5.022,0,0,1,1.846,4.328,5.4,5.4,0,0,1-1.665,4.04,6.316,6.316,0,0,1-4.6,1.62Zm205.259-.874V28.48a5.708,5.708,0,0,0-1.568-4.32,5.544,5.544,0,0,0-4-1.5,5.756,5.756,0,0,0-4.352,1.664,6.852,6.852,0,0,0-1.6,4.928V46.72h-9.6V1.92h9.6V17.728q2.88-3.9,9.152-3.9a11.431,11.431,0,0,1,8.544,3.52q3.425,3.519,3.424,9.728V46.72Zm-110.016,0V0h9.6V46.72ZM.424,29.253V24.712H1.846A5.022,5.022,0,0,1,0,20.384a5.406,5.406,0,0,1,1.665-4.04,6.314,6.314,0,0,1,4.6-1.619h9.292v4.54H6.931a2.7,2.7,0,0,0-2.043.742A2.62,2.62,0,0,0,4.177,21.9a2.722,2.722,0,0,0,.787,2.058,3.242,3.242,0,0,0,2.331.756h8.262v4.541Z'/%3E%3C/svg%3E`,
      url: '/',
      accessibilityLabel: 'Memegen',
    },
  };

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={LanguageMinor} />
          <VisuallyHidden>Secondary menu</VisuallyHidden>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: 'English',
              onAction: () => { i18n.changeLanguage('en') },
            },
            {
              content: 'Français',
              onAction: () => { i18n.changeLanguage('fr') },
            },
          ],
        },
      ]}
    />
  );

  const Header = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  useEffect(() => {
    getPosts('popular');
  }, []);

  return (
    <div>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            Frame: { skipToContent: 'Skip to content' },
            TopBar: {
              toggleMenuLabel: 'Toggle menu',
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
        <Frame
          topBar={Header}
          navigation={Sidebar}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          <div class="content-container">
            <Router>
              <Switch>
                <Route path="/create">
                  <CreatePostContainer />
                </Route>
                <Route path="/new">
                  <PostList posts={posts} />
                </Route>
                <Route path="/popular">
                  <PostList posts={posts} />
                </Route>
                <Route path="/posts/:postId" component={Showcase} />
              </Switch>
            </Router>
          </div>
        </Frame>
      </AppProvider>
    </div>
  );
}

export default App;
