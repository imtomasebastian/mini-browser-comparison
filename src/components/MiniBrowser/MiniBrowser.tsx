import { useState } from 'react'
import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import './MiniBrowser.css'
import { CometBorder } from './CometBorder'

// ─── Dimensions ───────────────────────────────────────────────────────────────

const DIMENSIONS = {
  collapsed: { width: 386, height: 156 },
  expanded: { width: 552, height: 285 },
} as const

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppItem {
  id: string
  icon: React.ReactNode
  name: string
  rating: string
  reviewCount: string
  meta: string
  badge: React.ReactNode | null
  installUrl: string | null
  disabled: boolean
}

interface TabItem {
  id: string
  icon: React.ReactNode
  label: string
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ShopifyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.672 3.614C12.622 3.61 11.544 3.529 11.544 3.529C11.544 3.529 10.796 2.787 10.714 2.704C10.694 2.684 10.67 2.671 10.643 2.662L10.109 14.992L14.325 14.076C14.325 14.076 12.805 3.798 12.795 3.728C12.785 3.657 12.723 3.618 12.672 3.614Z"
        fill="#5E8E3E"
      />
      <path
        d="M10.408 2.667C10.399 2.67 10.245 2.717 9.989 2.796C9.739 2.077 9.299 1.416 8.523 1.416C8.501 1.416 8.479 1.417 8.457 1.419C8.236 1.127 7.963 1 7.727 1C5.92 1 5.056 3.26 4.785 4.408C4.083 4.625 3.584 4.78 3.52 4.8C3.129 4.923 3.116 4.935 3.065 5.305C3.026 5.584 2 13.517 2 13.517L9.916 15L10.45 2.657C10.434 2.66 10.419 2.663 10.408 2.667ZM8.398 3.21C8.398 3.237 8.398 3.263 8.397 3.289C7.957 3.425 7.479 3.573 7 3.721C7.269 2.683 7.774 2.182 8.214 1.993C8.325 2.271 8.398 2.671 8.398 3.21ZM7.677 1.485C7.755 1.485 7.834 1.511 7.909 1.563C7.33 1.835 6.709 2.522 6.447 3.893C6.064 4.011 5.689 4.127 5.343 4.235C5.65 3.189 6.379 1.485 7.677 1.485ZM7.989 7.596C7.989 7.596 7.521 7.346 6.947 7.346C6.106 7.346 6.064 7.874 6.064 8.007C6.064 8.732 7.955 9.01 7.955 10.709C7.955 12.046 7.107 12.907 5.964 12.907C4.592 12.907 3.89 12.053 3.89 12.053L4.257 10.84C4.257 10.84 4.979 11.459 5.587 11.459C5.984 11.459 6.146 11.145 6.146 10.917C6.146 9.971 4.594 9.928 4.594 8.373C4.594 7.065 5.534 5.798 7.43 5.798C8.161 5.798 8.522 6.008 8.522 6.008L7.989 7.596ZM8.872 3.142C8.872 3.094 8.872 3.047 8.872 2.996C8.872 2.549 8.81 2.189 8.71 1.904C9.11 1.954 9.377 2.409 9.548 2.932C9.347 2.995 9.119 3.065 8.872 3.142Z"
        fill="#95BF47"
      />
      <path
        d="M7.99 7.596C7.99 7.596 7.521 7.346 6.948 7.346C6.107 7.346 6.065 7.873 6.065 8.006C6.065 8.732 7.956 9.01 7.956 10.709C7.956 12.046 7.108 12.907 5.965 12.907C4.593 12.907 3.891 12.053 3.891 12.053L4.258 10.839C4.258 10.839 4.979 11.458 5.588 11.458C5.985 11.458 6.147 11.145 6.147 10.917C6.147 9.97 4.595 9.928 4.595 8.373C4.595 7.064 5.535 5.798 7.431 5.798C8.162 5.798 8.523 6.007 8.523 6.007L7.99 7.596Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

function G2Icon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="mb-g2-clip">
          <rect width="16" height="16" fill="#fff" />
        </clipPath>
      </defs>
      <g clipPath="url(#mb-g2-clip)">
        <path
          d="M8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16Z"
          fill="#FF492C"
        />
        <path
          d="M11.463 6.128H10.096C10.133 5.913 10.266 5.793 10.535 5.657L10.786 5.529C11.236 5.299 11.476 5.038 11.476 4.613C11.476 4.345 11.371 4.134 11.165 3.982C10.959 3.83 10.716 3.755 10.431 3.755C10.21 3.752 9.994 3.814 9.808 3.933C9.621 4.048 9.482 4.197 9.396 4.382L9.791 4.779C9.944 4.469 10.167 4.317 10.46 4.317C10.707 4.317 10.86 4.445 10.86 4.622C10.86 4.771 10.786 4.894 10.501 5.038L10.339 5.117C9.989 5.294 9.746 5.497 9.605 5.728C9.464 5.958 9.396 6.248 9.396 6.598V6.694H11.463V6.128ZM11.28 7.347H9.018L7.887 9.305H10.149L11.28 11.265L12.412 9.305L11.28 7.347Z"
          fill="#FFFFFF"
        />
        <path
          d="M8.079 10.613C6.639 10.613 5.466 9.44 5.466 8C5.466 6.56 6.639 5.387 8.079 5.387L8.973 3.517C8.679 3.458 8.379 3.429 8.079 3.429C5.554 3.429 3.508 5.475 3.508 8C3.508 10.525 5.554 12.571 8.079 12.571C9.047 12.573 9.989 12.266 10.77 11.694L9.781 9.979C9.308 10.388 8.704 10.613 8.079 10.613Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  )
}

function SmileAppIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="56" height="56" rx="12" fill="#FCC419" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.774 23.333H34.411C34.14 23.333 33.907 23.43 33.711 23.627C33.533 23.805 33.421 24.016 33.415 24.256C33.411 24.403 33.39 25.263 33.342 25.806C33.194 27.382 32.672 28.649 31.775 29.608C30.885 30.561 29.627 31.039 28 31.047C26.371 31.04 25.112 30.561 24.221 29.608C23.325 28.649 22.802 27.382 22.654 25.806C22.606 25.263 22.585 24.403 22.581 24.256C22.575 24.016 22.463 23.805 22.285 23.627C22.089 23.43 21.856 23.333 21.585 23.333H20.222C19.951 23.333 19.718 23.43 19.521 23.627C19.343 23.805 19.227 23.982 19.227 24.292C19.227 24.292 19.275 25.707 19.3 25.99C19.521 28.501 20.387 30.5 21.899 31.989C23.397 33.464 25.42 34.208 27.968 34.221C28.008 34.222 28.018 34.222 28.029 34.222C30.577 34.208 32.6 33.464 34.097 31.989C35.609 30.5 36.475 28.501 36.696 25.99C36.722 25.707 36.77 24.292 36.77 24.292C36.77 23.982 36.653 23.805 36.476 23.627C36.279 23.43 36.046 23.333 35.774 23.333Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

function YotpoAppIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="mb-yotpo-clip">
          <rect width="38.844" height="11" fill="#fff" transform="translate(8.578 23)" />
        </clipPath>
      </defs>
      <rect width="56" height="56" rx="12" fill="#0042E4" />
      <g clipPath="url(#mb-yotpo-clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.874 24.678L12.291 28.585L13.776 24.678H15.884L12.28 33.725H10.195L11.261 30.921L8.699 24.678H10.874ZM33.135 24.539C35.038 24.539 36.425 26.016 36.425 28.037C36.425 30.059 35.038 31.536 33.135 31.536C32.432 31.536 31.841 31.35 31.39 30.991L31.361 30.968L31.335 30.947V33.723H29.305V24.678H31.1V25.354L31.111 25.342C31.553 24.838 32.222 24.559 33.049 24.54L33.093 24.54L33.135 24.539ZM19.583 24.539C21.678 24.539 23.163 25.987 23.163 28.037C23.163 30.079 21.673 31.536 19.583 31.536C17.48 31.536 15.988 30.081 15.988 28.037C15.988 25.985 17.475 24.539 19.583 24.539ZM26.547 23.189V24.678H28.218V26.432H26.547V28.853C26.547 29.395 26.81 29.693 27.289 29.711L27.313 29.712L27.336 29.712C27.661 29.712 27.907 29.627 28.128 29.415L28.148 29.395L28.203 29.339H28.218V31.274L28.156 31.304C27.821 31.463 27.615 31.536 27.046 31.536C25.435 31.536 24.551 30.659 24.517 29.022L24.516 28.972V28.922L24.516 26.432H23.781V24.678H24.571V23.189H26.547ZM40.863 24.539C42.959 24.539 44.444 25.987 44.444 28.037C44.444 30.079 42.954 31.536 40.863 31.536C38.761 31.536 37.268 30.081 37.268 28.037C37.268 25.985 38.756 24.539 40.863 24.539ZM46.1 29.31C46.714 29.31 47.212 29.808 47.212 30.423C47.212 31.037 46.714 31.536 46.1 31.536C45.485 31.536 44.987 31.037 44.987 30.423C44.987 29.808 45.485 29.31 46.1 29.31ZM32.831 26.363C31.915 26.363 31.294 27.04 31.294 28.037C31.294 29.035 31.915 29.712 32.831 29.712C33.757 29.712 34.381 29.037 34.381 28.037C34.381 27.038 33.757 26.363 32.831 26.363ZM19.582 26.363C18.665 26.363 18.032 27.044 18.032 28.037C18.032 29.032 18.665 29.712 19.583 29.712C20.489 29.712 21.119 29.029 21.119 28.037C21.119 27.046 20.488 26.363 19.582 26.363ZM40.863 26.363C39.945 26.363 39.313 27.044 39.313 28.037C39.313 29.032 39.945 29.712 40.863 29.712C41.769 29.712 42.4 29.029 42.4 28.037C42.4 27.046 41.769 26.363 40.863 26.363Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.974 4.074C5.263 3.309 6.354 3.309 6.643 4.074L7.361 5.982C7.422 6.145 7.53 6.286 7.672 6.388C7.813 6.49 7.982 6.549 8.156 6.556L10.205 6.645C11.029 6.68 11.365 7.711 10.721 8.221L9.116 9.488C8.979 9.597 8.877 9.742 8.823 9.907C8.77 10.073 8.766 10.25 8.813 10.417L9.36 12.38C9.58 13.168 8.697 13.806 8.01 13.354L6.3 12.23C6.154 12.134 5.983 12.083 5.808 12.083C5.634 12.083 5.463 12.134 5.317 12.23L3.607 13.354C2.92 13.805 2.037 13.168 2.257 12.38L2.805 10.417C2.852 10.25 2.848 10.072 2.794 9.907C2.74 9.742 2.638 9.596 2.501 9.488L0.896 8.221C0.252 7.711 0.589 6.679 1.412 6.644L3.461 6.555C3.635 6.548 3.804 6.489 3.946 6.387C4.087 6.285 4.195 6.143 4.256 5.981L4.974 4.074Z"
        fill="#157F3C"
      />
    </svg>
  )
}

function BuiltForShopifyBadge() {
  return (
    <div className="mb-badge-inner">
      <svg
        className="mb-badge-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.215 1.25L8.572 4.464L6 10.25L11.143 4.143L9.215 1.25ZM2.786 1.25L3.429 4.464L6 10.25L0.857 4.143L2.786 1.25Z"
          fill="#1495CC"
        />
        <path
          d="M2.785 1.25L3.428 4.464L5.999 10.25L8.571 4.464L9.214 1.25H2.785Z"
          fill="#58B7DF"
        />
        <path
          d="M6 10.25L3.429 4.464L0.857 4.143L6 10.25ZM6 10.25L8.572 4.464L11.143 4.143L6 10.25Z"
          fill="#035F86"
        />
        <path d="M6.001 4.786L3.43 4.465L6.001 10.251L8.573 4.465L6.001 4.786Z" fill="#1495CC" />
        <path d="M3.43 4.464L6.001 1.25L8.573 4.464L6 4.786L3.43 4.464Z" fill="#A9DEF4" />
        <path
          d="M3.428 4.464L2.785 1.25H5.999L3.428 4.464ZM8.571 4.464L9.214 1.25H5.999L8.571 4.464Z"
          fill="#58B7DF"
        />
        <path
          d="M3.429 4.464L2.786 1.25L0.857 4.143L3.429 4.464ZM8.572 4.464L9.215 1.25L11.143 4.143L8.572 4.464Z"
          fill="#1495CC"
        />
      </svg>
      <span className="mb-badge-label">Built for Shopify</span>
    </div>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 9L10 12L13 9"
        stroke="#686C7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.64645 1.64645C5.84173 1.45145 6.1583 1.45127 6.35348 1.64645C6.54862 1.84162 6.54847 2.15821 6.35348 2.35348L4.70992 3.99606L6.36031 5.64645C6.55531 5.84173 6.55549 6.1583 6.36031 6.35348C6.16514 6.54865 5.84857 6.54848 5.65328 6.35348L4.00289 4.70309L2.35348 6.35348C2.15823 6.54873 1.84171 6.5487 1.64645 6.35348C1.45118 6.15822 1.45118 5.84171 1.64645 5.64645L3.29586 3.99606L1.65328 2.35348C1.45802 2.15822 1.45802 1.84171 1.65328 1.64645C1.84854 1.45118 2.16505 1.45118 2.36031 1.64645L4.00289 3.28902L5.64645 1.64645Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 3.5C6.77614 3.5 7 3.72386 7 4C7 4.27614 6.77614 4.5 6.5 4.5H1.5C1.22386 4.5 1 4.27614 1 4C1 3.72386 1.22386 3.5 1.5 3.5H6.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.20703 6.50003H5.50003C6.05203 6.50003 6.50003 6.05203 6.50003 5.50003V2.20703L2.20703 6.50003Z"
        fill="currentColor"
      />
      <path d="M2.5 1.5C1.948 1.5 1.5 1.948 1.5 2.5V5.793L5.793 1.5H2.5Z" fill="currentColor" />
    </svg>
  )
}

function CollapseIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M7.5 4L4 7.5V5C4 4.44772 4.44772 4 5 4H7.5Z" fill="currentColor" />
      <path d="M4 3C4 3.55228 3.55228 4 3 4H0.5L4 0.5V3Z" fill="currentColor" />
    </svg>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WindowControls({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <div className="mb-window-controls">
      <button className="mb-dot mb-dot--red" aria-label="Close" onClick={() => {}}>
        <span className="mb-dot-icon">
          <CloseIcon />
        </span>
      </button>
      <button className="mb-dot mb-dot--orange" aria-label="Minimize" onClick={() => {}}>
        <span className="mb-dot-icon">
          <MinimizeIcon />
        </span>
      </button>
      <button
        className="mb-dot mb-dot--green"
        aria-label={collapsed ? 'Expand' : 'Collapse'}
        onClick={onToggle}
      >
        <span className="mb-dot-icon">{collapsed ? <FullscreenIcon /> : <CollapseIcon />}</span>
      </button>
    </div>
  )
}

const TABS: TabItem[] = [
  { id: 'shopify', icon: <ShopifyIcon />, label: 'Shopify App Store' },
  { id: 'g2', icon: <G2Icon />, label: 'G2 Software Reviews' },
]

function Tab({ tab, isActive, onClick }: { tab: TabItem; isActive: boolean; onClick: () => void }) {
  return (
    <button
      className={`mb-tab${isActive ? ' mb-tab--active' : ''}`}
      onClick={onClick}
      aria-selected={isActive}
      role="tab"
    >
      {tab.icon}
      <span className="mb-tab-label">{tab.label}</span>
    </button>
  )
}

function InstallButton({
  href,
  collapsed = false,
  spring,
}: {
  href: string | null
  collapsed?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spring: any
}) {
  if (!href) {
    return (
      <div className="mb-btn-wrapper mb-btn-wrapper--secondary" aria-disabled="true">
        <div className="mb-btn-inner mb-btn-inner--secondary">
          <span className="mb-btn-label mb-btn-label--secondary">Install</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-btn-wrapper">
      <CometBorder />
      <motion.a
        className="mb-btn-inner"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        initial={false}
        animate={{ paddingLeft: collapsed ? 16 : 24, paddingRight: collapsed ? 16 : 24 }}
        transition={spring}
      >
        <span className="mb-btn-label">Install</span>
      </motion.a>
    </div>
  )
}

function ListItem({
  app,
  collapsed = false,
  spring,
  iconSpring,
  iconSize,
  paddingCollapsed,
  paddingExpanded,
}: {
  app: AppItem
  collapsed?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spring: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconSpring: any
  iconSize: { collapsed: number; expanded: number }
  paddingCollapsed: number
  paddingExpanded: number
}) {
  return (
    <motion.div
      className={`mb-list-item${app.disabled ? ' mb-list-item--disabled' : ''}`}
      initial={false}
      animate={{
        paddingTop: collapsed ? paddingCollapsed : paddingExpanded,
        paddingBottom: collapsed ? paddingCollapsed : paddingExpanded,
        paddingLeft: collapsed ? paddingCollapsed : paddingExpanded,
        paddingRight: collapsed ? paddingCollapsed : paddingExpanded,
      }}
      transition={spring}
    >
      <motion.div
        className="mb-app-icon"
        initial={false}
        animate={{
          width: collapsed ? iconSize.collapsed : iconSize.expanded,
          height: collapsed ? iconSize.collapsed : iconSize.expanded,
        }}
        transition={iconSpring}
      >
        {app.icon}
      </motion.div>
      <div className="mb-app-description">
        <div className="mb-app-title">
          <span className="mb-app-name">{app.name}</span>
          <div className="mb-app-subtitle">
            <span className="mb-rating">{app.rating}</span>
            <StarIcon />
            <span className="mb-meta">
              ({app.reviewCount}) • {app.meta}
            </span>
          </div>
        </div>
        {app.badge && <div className="mb-badge">{app.badge}</div>}
      </div>
      <InstallButton
        href={app.disabled ? null : app.installUrl}
        collapsed={collapsed}
        spring={spring}
      />
    </motion.div>
  )
}

const APPS: AppItem[] = [
  {
    id: 'smile',
    icon: <SmileAppIcon />,
    name: 'Smile: Loyalty Program Rewards',
    rating: '4.9',
    reviewCount: '4,126',
    meta: 'Free to install • Free trial available',
    badge: <BuiltForShopifyBadge />,
    installUrl: 'https://apps.shopify.com/smile-io',
    disabled: false,
  },
  {
    id: 'yotpo',
    icon: <YotpoAppIcon />,
    name: 'Yotpo: Loyalty Rewards Program',
    rating: '4.7',
    reviewCount: '927',
    meta: 'Free to install',
    badge: null,
    installUrl: null,
    disabled: true,
  },
]

// ─── MiniBrowser ─────────────────────────────────────────────────────────────

export function MiniBrowser() {
  const [activeTab, setActiveTab] = useState('shopify')
  const [collapsed, setCollapsed] = useState(false)

  const dims = collapsed ? DIMENSIONS.collapsed : DIMENSIONS.expanded
  const dir = collapsed ? 'collapse' : 'expand'

  const p = useDialKit('Mini Browser', {
    layoutSpring: {
      collapse: {
        duration: [0.5, 0, 1] as [number, number, number],
        bounce: [0.35, 0, 1] as [number, number, number],
        delay: [0, 0, 1] as [number, number, number],
      },
      expand: {
        duration: [0.65, 0, 1] as [number, number, number],
        bounce: [0.35, 0, 1] as [number, number, number],
        delay: [0, 0, 1] as [number, number, number],
      },
    },
    secondRow: {
      collapse: {
        duration: [0.4, 0, 1] as [number, number, number],
        bounce: [0, 0, 1] as [number, number, number],
        yDelay: [0, 0, 1] as [number, number, number],
        opacityDuration: [0.2, 0, 1] as [number, number, number],
        opacityDelay: [0, 0, 1] as [number, number, number],
        slideY: [30, 0, 200] as [number, number, number],
      },
      expand: {
        duration: [0.4, 0, 1] as [number, number, number],
        bounce: [0, 0, 1] as [number, number, number],
        yDelay: [0, 0, 1] as [number, number, number],
        opacityDuration: [0.25, 0, 1] as [number, number, number],
        opacityDelay: [0.05, 0, 1] as [number, number, number],
        slideY: [30, 0, 200] as [number, number, number],
      },
    },
    divider: {
      collapse: {
        opacityDuration: [0.1, 0, 1] as [number, number, number],
        opacityDelay: [0.05, 0, 1] as [number, number, number],
      },
      expand: {
        opacityDuration: [0.1, 0, 1] as [number, number, number],
        opacityDelay: [0.05, 0, 1] as [number, number, number],
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as any

  const LAYOUT_SPRING = {
    collapse: {
      type: 'spring',
      duration: p.layoutSpring.collapse.duration,
      bounce: p.layoutSpring.collapse.bounce,
      delay: p.layoutSpring.collapse.delay,
    },
    expand: {
      type: 'spring',
      duration: p.layoutSpring.expand.duration,
      bounce: p.layoutSpring.expand.bounce,
      delay: p.layoutSpring.expand.delay,
    },
  }

  const SECOND_ROW = {
    collapse: {
      spring: {
        type: 'spring',
        duration: p.secondRow.collapse.duration,
        bounce: p.secondRow.collapse.bounce,
      },
      yDelay: p.secondRow.collapse.yDelay,
      opacityDuration: p.secondRow.collapse.opacityDuration,
      opacityDelay: p.secondRow.collapse.opacityDelay,
      slideY: p.secondRow.collapse.slideY,
    },
    expand: {
      spring: {
        type: 'spring',
        duration: p.secondRow.expand.duration,
        bounce: p.secondRow.expand.bounce,
      },
      yDelay: p.secondRow.expand.yDelay,
      opacityDuration: p.secondRow.expand.opacityDuration,
      opacityDelay: p.secondRow.expand.opacityDelay,
      slideY: p.secondRow.expand.slideY,
    },
  }

  const DIVIDER = {
    collapse: {
      opacityDuration: p.divider.collapse.opacityDuration,
      opacityDelay: p.divider.collapse.opacityDelay,
    },
    expand: {
      opacityDuration: p.divider.expand.opacityDuration,
      opacityDelay: p.divider.expand.opacityDelay,
    },
  }

  const rowSpring = LAYOUT_SPRING[dir]

  return (
    <motion.div
      className="mini-browser"
      role="application"
      aria-label="Browser comparison"
      initial={false}
      animate={{ width: dims.width, height: dims.height }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition={{ width: rowSpring as any, height: rowSpring as any }}
    >
      {/* Browser bar */}
      <div className="mb-browser-bar">
        <WindowControls collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div className="mb-tab-bar" role="tablist" aria-label="Review platforms">
          {TABS.map((tab) => (
            <Tab
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
        <ChevronDownIcon />
      </div>

      {/* Browser window */}
      <div className="mb-browser-window" role="tabpanel">
        <div className="mb-app-list">
          <ListItem
            app={APPS[0]}
            collapsed={collapsed}
            spring={rowSpring}
            iconSpring={rowSpring}
            iconSize={{ collapsed: 44, expanded: 56 }}
            paddingCollapsed={20}
            paddingExpanded={28}
          />
          <motion.div
            className="mb-divider"
            aria-hidden="true"
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{
              duration: DIVIDER[dir].opacityDuration,
              delay: DIVIDER[dir].opacityDelay,
              ease: 'easeOut',
            }}
          />
          <motion.div
            initial={false}
            animate={{
              y: collapsed ? SECOND_ROW.collapse.slideY : 0,
              opacity: collapsed ? 0 : 1,
            }}
            transition={
              collapsed
                ? {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    y: { ...SECOND_ROW.collapse.spring, delay: SECOND_ROW.collapse.yDelay } as any,
                    opacity: {
                      duration: SECOND_ROW.collapse.opacityDuration,
                      delay: SECOND_ROW.collapse.opacityDelay,
                      ease: 'easeOut',
                    },
                  }
                : {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    y: { ...SECOND_ROW.expand.spring, delay: SECOND_ROW.expand.yDelay } as any,
                    opacity: {
                      duration: SECOND_ROW.expand.opacityDuration,
                      delay: SECOND_ROW.expand.opacityDelay,
                      ease: 'easeOut',
                    },
                  }
            }
            className="mb-second-row"
          >
            <ListItem
              app={APPS[1]}
              spring={rowSpring}
              iconSpring={rowSpring}
              iconSize={{ collapsed: 44, expanded: 56 }}
              paddingCollapsed={20}
              paddingExpanded={28}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
