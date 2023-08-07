export interface MessageTool {
  icon?: string
  name?: string
  click?: (...args: any[]) => void
}
