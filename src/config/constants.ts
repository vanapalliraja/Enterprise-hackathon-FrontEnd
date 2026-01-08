import { UserRole, TicketStatus, WorkflowTransition } from '../types';

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
};

export const AUTH_CONFIG = {
  TOKEN_KEY: 'itsd_auth_token',
  REFRESH_TOKEN_KEY: 'itsd_refresh_token',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, 
  SESSION_TIMEOUT: 30 * 60 * 1000, 
};

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
};

export const ROLE_DISPLAY: Record<UserRole, { label: string; color: string }> = {
  [UserRole.ADMIN]: { label: 'Administrator', color: '#D32F2F' },
  [UserRole.MANAGER]: { label: 'Manager', color: '#1976D2' },
  [UserRole.REVIEWER]: { label: 'Reviewer', color: '#388E3C' },
  [UserRole.VIEWER]: { label: 'Viewer', color: '#757575' },
};

export const STATUS_DISPLAY: Record<TicketStatus, { label: string; color: string; bgColor: string }> = {
  [TicketStatus.OPEN]: { label: 'Open', color: '#1565C0', bgColor: '#E3F2FD' },
  [TicketStatus.IN_PROGRESS]: { label: 'In Progress', color: '#F57C00', bgColor: '#FFF3E0' },
  [TicketStatus.PENDING_REVIEW]: { label: 'Pending Review', color: '#7B1FA2', bgColor: '#F3E5F5' },
  [TicketStatus.RESOLVED]: { label: 'Resolved', color: '#388E3C', bgColor: '#E8F5E9' },
  [TicketStatus.CLOSED]: { label: 'Closed', color: '#455A64', bgColor: '#ECEFF1' },
  [TicketStatus.REJECTED]: { label: 'Rejected', color: '#C62828', bgColor: '#FFEBEE' },
};

export const PRIORITY_DISPLAY = {
  low: { label: 'Low', color: '#4CAF50', icon: 'arrow_downward' },
  medium: { label: 'Medium', color: '#FF9800', icon: 'remove' },
  high: { label: 'High', color: '#F44336', icon: 'arrow_upward' },
  critical: { label: 'Critical', color: '#B71C1C', icon: 'priority_high' },
};

export const CATEGORY_DISPLAY = {
  hardware: { label: 'Hardware', icon: 'computer' },
  software: { label: 'Software', icon: 'apps' },
  network: { label: 'Network', icon: 'wifi' },
  access: { label: 'Access', icon: 'vpn_key' },
  other: { label: 'Other', icon: 'help_outline' },
};

export const WORKFLOW_TRANSITIONS: WorkflowTransition[] = [

  { from: TicketStatus.OPEN, to: TicketStatus.IN_PROGRESS, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.REVIEWER], requiresComment: false },
  { from: TicketStatus.OPEN, to: TicketStatus.REJECTED, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER], requiresComment: true },
  
  { from: TicketStatus.IN_PROGRESS, to: TicketStatus.PENDING_REVIEW, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.REVIEWER], requiresComment: false },
  { from: TicketStatus.IN_PROGRESS, to: TicketStatus.OPEN, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER], requiresComment: true },
  
  
  { from: TicketStatus.PENDING_REVIEW, to: TicketStatus.RESOLVED, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER], requiresComment: false },
  { from: TicketStatus.PENDING_REVIEW, to: TicketStatus.IN_PROGRESS, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.REVIEWER], requiresComment: true },
  
  
  { from: TicketStatus.RESOLVED, to: TicketStatus.CLOSED, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER], requiresComment: false },
  { from: TicketStatus.RESOLVED, to: TicketStatus.IN_PROGRESS, allowedRoles: [UserRole.ADMIN, UserRole.MANAGER], requiresComment: true },
  
  
  { from: TicketStatus.CLOSED, to: TicketStatus.OPEN, allowedRoles: [UserRole.ADMIN], requiresComment: true },
  
  
  { from: TicketStatus.REJECTED, to: TicketStatus.OPEN, allowedRoles: [UserRole.ADMIN], requiresComment: true },
];


export const SLA_CONFIG = {
  critical: 4,
  high: 8,
  medium: 24,
  low: 72,
};


export const NAV_ITEMS = {
  common: [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/tickets', label: 'Tickets', icon: 'confirmation_number' },
  ],
  [UserRole.ADMIN]: [
    { path: '/users', label: 'User Management', icon: 'people' },
    { path: '/reports', label: 'Reports', icon: 'assessment' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ],
  [UserRole.MANAGER]: [
    { path: '/team', label: 'Team', icon: 'groups' },
    { path: '/reports', label: 'Reports', icon: 'assessment' },
  ],
  [UserRole.REVIEWER]: [
    { path: '/my-queue', label: 'My Queue', icon: 'queue' },
  ],
  [UserRole.VIEWER]: [],
};
