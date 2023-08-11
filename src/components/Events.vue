<template>
  <div py-20px font-500 text="26px left">
    Event
  </div>
  <table>
    <thead>
      <th width="180px">
        Name
      </th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
      <th>Version</th>
    </thead>
    <tbody>
      <tr>
        <td>change-contact</td>
        <td>
          <code>
            (contact: Contact) => void
          </code>
        </td>
        <td>undefined</td>
        <td>点击最近联系人</td>
        <td />
      </tr>
      <tr>
        <td>pull-message</td>
        <td>
          <code>
            ({ next, contactId }:PullMessageOption) => void
          </code>
        </td>
        <td>undefined</td>
        <td>当切换聊天对象时或滚动条滚动至顶部时会触发该事件，调用next结束loading状态，设置isEnd为true下次滚动到顶部时不会再触发该事件</td>
        <td />
      </tr>
      <tr>
        <td>send</td>
        <td>
          <code>
            ({ message, next, file }: SendOption) => void
          </code>
        </td>
        <td>undefined</td>
        <td>当点击发送按钮时触发，message是消息内容，调用next设置这条消息状态，发送文件消息时会有file参数</td>
        <td />
      </tr>
      <tr>
        <td>message-avatar-click</td>
        <td>
          <code>
            (message: Message) => void
          </code>
        </td>
        <td>undefined</td>
        <td>当点击聊天窗口中用户头像时触发</td>
        <td />
      </tr>
      <tr>
        <td>message-click</td>
        <td>
          <code>
            (message: Message) => void
          </code>
        </td>
        <td>undefined</td>
        <td>当点击聊天窗口中消息内容时触发</td>
        <td />
      </tr>
      <tr>
        <td>message-contextmenu</td>
        <td>
          <code>
            (message: Message) => void
          </code>
        </td>
        <td>undefined</td>
        <td>当鼠标右键聊天窗口中消息内容时触发</td>
        <td />
      </tr>
      <tr>
        <td>menu-click</td>
        <td>
          <code>
            (menuKey: string, menu: Menu) => void
          </code>
        </td>
        <td>undefined</td>
        <td>当点击左侧菜单时触发</td>
        <td />
      </tr>
      <tr>
        <td>event-message-click</td>
        <td>
          <code>
            (message: Message) => void
          </code>
        </td>
        <td>undefined</td>
        <td>Event消息点击事件，Event消息如果需要点击事件，message的content用*分割需要点击事件的内容，示例：我撤回了一条消息*重新编辑</td>
        <td />
      </tr>
    </tbody>
  </table>
</template>
