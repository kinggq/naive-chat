<template>
  <div py-20px font-500 text="26px left">
    Contact
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
        <td>id</td>
        <td>
          <code>
            number
          </code>
        </td>
        <td>必须</td>
        <td>唯一标识</td>
        <td />
      </tr>
      <tr>
        <td>nickname</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>必须</td>
        <td>昵称</td>
        <td />
      </tr>
      <tr>
        <td>lastMessage</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>可选</td>
        <td>不为空时表示是近期联系人</td>
        <td />
      </tr>
      <tr>
        <td>lastTime</td>
        <td>
          <code>
            number
          </code>
        </td>
        <td>可选</td>
        <td>最后一次消息时间</td>
        <td />
      </tr>
      <tr>
        <td>avatar</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>必须</td>
        <td>头像</td>
        <td />
      </tr>
      <tr>
        <td>quiet</td>
        <td>
          <code>
            boolean
          </code>
        </td>
        <td>可选/false</td>
        <td>是否免打扰</td>
        <td />
      </tr>
      <tr>
        <td>unread</td>
        <td>
          <code>
            number
          </code>
        </td>
        <td>可选</td>
        <td>未读消息数量</td>
        <td />
      </tr>
      <tr>
        <td>index</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>必须</td>
        <td>联系人排序前缀</td>
        <td />
      </tr>
    </tbody>
  </table>
</template>
