<template>
  <div py-20px font-500 text="26px left">
    Methods
  </div>
  <table>
    <thead>
      <tr>
        <th width="180px">
          Name
        </th>
        <th>Type</th>
        <th>Description</th>
        <th>Version</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>initContacts</td>
        <td>
          <code>(contacts: Contact[]) => void</code>
        </td>
        <td>初始化联系人</td>
        <td />
      </tr>
      <tr>
        <td>appendMessage</td>
        <td>
          <code>(message: Message) => void</code>
        </td>
        <td>添加一条消息</td>
        <td />
      </tr>
      <tr>
        <td>updateContact</td>
        <td>
          <code>(contact: Contact) => void</code>
        </td>
        <td>修改联系人信息</td>
        <td />
      </tr>
      <tr>
        <td>updateMessage</td>
        <td>
          <code>(message: Message) => void</code>
        </td>
        <td>修改一条信息</td>
        <td />
      </tr>
      <tr>
        <td>getCurrentContact</td>
        <td>
          <code>() => Contact | undefined</code>
        </td>
        <td>返回当前聊天窗口联系人信息</td>
        <td />
      </tr>
      <tr>
        <td>appendContact</td>
        <td>
          <code>(contact: Contact) => void</code>
        </td>
        <td>添加一个联系人</td>
        <td />
      </tr>
      <tr>
        <td>removeContact</td>
        <td>
          <code>(id: number) => void</code>
        </td>
        <td>删除一个联系人</td>
        <td />
      </tr>
      <tr>
        <td>clearMessage</td>
        <td>
          <code>(id: number) => void</code>
        </td>
        <td>清空某个联系人的消息</td>
        <td />
      </tr>
      <tr>
        <td>removeOneMessage</td>
        <td>
          <code>(contactId: number, messageId: string) => void</code>
        </td>
        <td>删除一条消息</td>
        <td />
      </tr>
      <tr>
        <td>getCurrentMessage</td>
        <td>
          <code>() => void</code>
        </td>
        <td>获取当前聊天窗口全部消息</td>
        <td />
      </tr>
      <tr>
        <td>getCurrentLastMessage</td>
        <td>
          <code>() => void</code>
        </td>
        <td>获取当前聊天窗口最后一条消息</td>
        <td />
      </tr>
      <tr>
        <td>setValue</td>
        <td>
          <code>(text: string) => void</code>
        </td>
        <td>给输入框设置内容</td>
        <td />
      </tr>
    </tbody>
  </table>
</template>
