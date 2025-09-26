export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'provider';
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}