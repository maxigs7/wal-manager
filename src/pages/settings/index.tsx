import React, { Suspense } from 'react';
import { NavLink, Redirect, Switch } from 'react-router-dom';

import DefaultProfileImg from '@app/assets/images/default-profile.png';
import { CardContainer, ImageWithFallback } from '@app/components/ui';
import PrivateRoute from '@app/routes/private.route';
import { settingsRoutes } from '@app/routes/settings.route';
import { useAuth } from '@lib/auth';

const styles = {
  navbar: 'border-t',
  navItem: 'inline-block px-8 py-4 border-r hover:bg-indigo-500 hover:text-white',
  navItemActive: 'bg-indigo-700 text-white',
  profileCard: 'flex align-center p-5',
  profileImage: 'mr-5 w-24 h-24',
  profileInfo: 'col-span-3',
};

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  console.log('Settings Page rendering...');
  return (
    <>
      <CardContainer className="mb-5">
        <div className={styles.profileCard}>
          {user?.photoURL && (
            <ImageWithFallback
              className={styles.profileImage}
              fallbackSrc={DefaultProfileImg}
              src={user?.photoURL}
            />
          )}
          <div className={styles.profileInfo}>
            <h2>{user?.displayName}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className={styles.navbar}>
          <NavLink
            activeClassName={styles.navItemActive}
            className={styles.navItem}
            to="/settings/profile"
          >
            Profile
          </NavLink>
          <NavLink
            activeClassName={styles.navItemActive}
            className={styles.navItem}
            to="/settings/categories"
          >
            Categories
          </NavLink>
        </div>
      </CardContainer>

      <CardContainer>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {settingsRoutes.map((route, index) => (
              <PrivateRoute {...route} key={index} />
            ))}
            <Redirect from="/settings" to="/settings/profile" exact />
          </Switch>
        </Suspense>
      </CardContainer>
    </>
  );
};

export default SettingsPage;
