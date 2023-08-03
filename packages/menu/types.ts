export type MenuKey = 'message' | 'contact' | 'more'
export interface Menu {
  key: MenuKey
  icon: string
  activeIcon: string
  active: boolean
}
