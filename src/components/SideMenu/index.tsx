import { useEffect, useState } from 'react';
import { StyledDrawer, ListWrapper, SameTabLink, NewTabLink } from './styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import itemBulletIcon from '../../assets/icons/item_bullet.svg';
import {
  ScopedCssBaseline,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  Collapse
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SideMenuLink } from '@/interfaces';

export interface SideMenuProps {
  links: SideMenuLink[];
  visibility?: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideMenuIcon({ iconUrl, title, IconComponent }: any) {
  return (
    <ListItemIcon sx={{ color: 'white', justifyContent: 'center' }}>
      {iconUrl && <img src={iconUrl} alt={`${title} icon`} />}

      {IconComponent && <IconComponent />}
    </ListItemIcon>
  );
}

export function SideMenu({
  links,
  visibility = false,
  setVisibility
}: SideMenuProps) {
  const [showChildrenLinks, setShowChildrenLinks] = useState<boolean[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (links && links.length > 0) {
      setShowChildrenLinks(links.map(() => false));
    }
  }, []);

  function toggleChildrenLinks(index: number) {
    if (!showChildrenLinks[index]) {
      setShowChildrenLinks(
        showChildrenLinks.map((value, index_map) => {
          if (index_map === index) {
            return true;
          } else {
            return value;
          }
        })
      );
    } else {
      setShowChildrenLinks(
        showChildrenLinks.map((value, index_map) => {
          if (index_map === index) {
            return false;
          } else {
            return value;
          }
        })
      );
    }
  }

  const toggleDrawer = () => {
    setVisibility(!visibility);
  };

  const list = (
    <ListWrapper
      style={{
        paddingTop: '15px',
        paddingBottom: '15px'
      }}
    >
      {links.map((link, index) => {
        return (
          <div key={`link_${link.id}`}>
            {link.children !== undefined && link.children.length > 0 ? (
              <List
                sx={{
                  display: 'flex',
                  padding: '0px',
                  flexDirection: 'column'
                }}
              >
                <ListItem
                  button
                  sx={{
                    display: 'flex',
                    padding: '0px',
                    paddingRight: '20px',
                    marginRight: '4px',
                    maxWidth: '100%',
                    minHeight: '54px'
                  }}
                  key={`links_${link}`}
                  onClick={() => toggleChildrenLinks(index)}
                >
                  {link.external ? (
                    <NewTabLink
                      style={{ minHeight: '54px' }}
                      href={link.href as string}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={toggleDrawer}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          justifyItems: 'center',
                          maxWidth: '20%'
                        }}
                      >
                        <SideMenuIcon
                          iconUrl={link.iconUrl}
                          title={link.iconUrl}
                          IconComponent={link.IconComponent}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'left',
                          minWidth: '78%'
                        }}
                      >
                        {link.title}
                      </div>
                    </NewTabLink>
                  ) : (
                    <SameTabLink
                      to={link.href as string}
                      style={{
                        minHeight: '54px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center'
                      }}
                      onClick={toggleDrawer}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          justifyItems: 'center',
                          maxWidth: '20%'
                        }}
                      >
                        <SideMenuIcon
                          iconUrl={link.iconUrl}
                          title={link.iconUrl}
                          IconComponent={link.IconComponent}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'left',
                          minWidth: '78%'
                        }}
                      >
                        {link.title}
                      </div>
                    </SameTabLink>
                  )}
                  {showChildrenLinks[index] ? (
                    <ExpandLessIcon
                      htmlColor='white'
                      sx={{ marginLeft: '-10px', paddingLeft: '1px' }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      htmlColor='white'
                      sx={{ marginLeft: '-10px', paddingLeft: '1px' }}
                    />
                  )}
                  <Divider />
                </ListItem>

                <Collapse
                  in={showChildrenLinks[index]}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {link.children.map((child) => {
                      return (
                        <ListItem
                          button
                          key={`linkChild_${child.id}`}
                          sx={{
                            display: 'flex',
                            minWidth: '100%',
                            padding: '0px'
                          }}
                        >
                          {child.external ? (
                            <NewTabLink
                              style={{
                                minHeight: '35px'
                              }}
                              href={child.href as string}
                              target='_blank'
                              rel='noopener noreferrer'
                              onClick={toggleDrawer}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  minHeight: '100%',
                                  overflow: 'clip',
                                  flexWrap: 'nowrap'
                                }}
                              >
                                <img
                                  src={itemBulletIcon}
                                  alt={`${child.title} Icon`}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'left',
                                  minWidth: '80%'
                                }}
                              >
                                {child.title}
                              </div>
                            </NewTabLink>
                          ) : (
                            <SameTabLink
                              to={child.href as string}
                              style={{
                                display: 'flex',
                                minHeight: '35px'
                              }}
                              onClick={toggleDrawer}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  minHeight: '100%',
                                  overflow: 'clip',
                                  flexWrap: 'nowrap'
                                }}
                              >
                                <img
                                  src={itemBulletIcon}
                                  alt={`${child.title} Icon`}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'left',
                                  minWidth: '80%'
                                }}
                              >
                                {child.title}
                              </div>
                            </SameTabLink>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
                <Divider />
              </List>
            ) : (
              <List sx={{ padding: '0px' }}>
                <ListItem
                  button
                  key={`linkChildren_${link.id}`}
                  sx={{
                    padding: '0px'
                  }}
                >
                  {link.external ? (
                    <NewTabLink
                      style={{ minHeight: '54px' }}
                      href={link.href as string}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={toggleDrawer}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          justifyItems: 'center',
                          maxWidth: '20%'
                        }}
                      >
                        <SideMenuIcon
                          iconUrl={link.iconUrl}
                          title={link.iconUrl}
                          IconComponent={link.IconComponent}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'left',
                          minWidth: '80%'
                        }}
                      >
                        {link.title}
                      </div>
                    </NewTabLink>
                  ) : (
                    <SameTabLink
                      to={link.href as string}
                      style={{ minHeight: '54px' }}
                      onClick={toggleDrawer}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          justifyItems: 'center',
                          maxWidth: '20%'
                        }}
                      >
                        <SideMenuIcon
                          iconUrl={link.iconUrl}
                          title={link.iconUrl}
                          IconComponent={link.IconComponent}
                        />
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'left',
                          minWidth: '80%'
                        }}
                      >
                        {link.title}
                      </div>
                    </SameTabLink>
                  )}
                </ListItem>
                <Divider />
              </List>
            )}
          </div>
        );
      })}
    </ListWrapper>
  );
  return (
    <div>
      <ScopedCssBaseline>
        <StyledDrawer open={visibility} onClose={toggleDrawer}>
          {list}
        </StyledDrawer>
      </ScopedCssBaseline>
    </div>
  );
}
