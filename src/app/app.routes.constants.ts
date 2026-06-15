export const APP_ROUTES = {
  home: '',
  about: 'sobre-mi',
  projects: 'proyectos',
  projectDetail: 'proyectos/:slug',
  contact: 'contactos',
  contactLegacy: 'contacto',
} as const;

export const APP_PATHS = {
  home: '/',
  about: '/sobre-mi',
  projects: '/proyectos',
  projectDetail: (slug: string) => `/proyectos/${slug}`,
  contact: '/contactos',
} as const;

export function isProjectDetailPath(url: string): boolean {
  return url.startsWith(`${APP_PATHS.projects}/`) && url !== APP_PATHS.projects;
}
