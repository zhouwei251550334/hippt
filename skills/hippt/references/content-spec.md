# Mandatory PPT content specification

Create a durable Markdown artifact named `ppt-content-spec.md` before template selection or slide production. Do not satisfy this gate with a short chat summary alone. Provide the file to the user and wait for explicit approval.

## Purpose

Use the file as the content contract between source analysis and visual design. Make it detailed enough that the user can judge the whole presentation without seeing a template.

Keep it design-neutral. Do not recommend a specific template, font, palette, photograph, icon, or decorative treatment before approval.

## Required document structure

```markdown
# PPT 内容说明

## 文档状态

- 状态：待确认
- 版本：v1
- 制作模式：标准 / 快速 / 忠实迁移
- 预计页数：
- 预计演讲时长：
- 内容依据：

## 一、沟通任务

- 受众：
- 使用场景：
- 希望受众最终理解、相信、决定或行动：
- 核心结论：

## 二、内容来源与边界

| 编号 | 来源 | 角色 | 可用范围 | 证据状态 |
|---|---|---|---|---|
| S01 |  | 事实来源 / 支持材料 / 用户要求 |  | 已验证 / 用户提供 / 推测 / 缺失 |

## 三、整体叙事

1. 开场：
2. 主体一：
3. 主体二：
4. 收束：

## 四、逐页内容

### P01｜页面标题

- 页面任务：这一页在整体叙事中解决什么问题
- 页面内容：
  - 可直接放到页面上的标题、要点、数据、标签或案例
  - 明确层级，不写“介绍背景”“展示数据”等空泛占位语
- 证据与来源：S01；已验证 / 用户提供 / 推测 / 缺失
- 建议演讲稿：自然、可直接讲述的内容；说明重点、必要背景和与下一页的过渡
- 待确认项：无 / 需要用户确认的具体问题

## 五、待确认事项

- [ ] 页数和顺序
- [ ] 标题与核心结论
- [ ] 页面内容与数据
- [ ] 建议演讲稿的语气和深度
- [ ] 证据边界及待补材料

## 六、确认记录

- 当前状态：待用户确认
- 用户确认时间：
- 确认后的内容变更：无
```

## Per-slide requirements

- Cover: include the exact title, subtitle, presenter or organization fields, opening lines, and any unresolved naming issue.
- Section divider: state the section question and the transition talk track; do not leave it as a decorative title only.
- Content slide: write the actual on-slide wording and data hierarchy, not only a core-message summary.
- Data or medical slide: retain definitions, units, time periods, denominators, source identifiers, evidence type or grade when defensible, and uncertainty.
- Case slide: separate supplied facts, teaching additions, inference, and missing information.
- Closing slide: state the audience takeaway, decision, action, or next step and provide a closing talk track.

## Suggested speaker notes

- Write in the presenter's natural voice and for the actual audience.
- Explain what is not already obvious on the canvas; do not simply read bullets aloud.
- Include transitions when they materially improve the narrative.
- Keep timing proportional to the total presentation duration.
- Do not invent personal experience, quotations, customer outcomes, clinical facts, or commitments.
- Mark proposed wording when the presenter has not supplied a personal voice.

## Approval behavior

- Treat “确认”“按这个内容做”“内容没问题” or an equally explicit statement as approval.
- Treat page-specific edits as a revision request, not approval of the unchanged remainder unless the intent is clear.
- Update the file version and change notes after revisions.
- After approval, freeze page order, claims, source relationships, and speaker-note meaning for template selection and production.
- If a material change is needed later, update `ppt-content-spec.md` first and obtain renewed confirmation.
