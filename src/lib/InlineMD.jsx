// Tiny inline formatter for **bold** and *italic*.
// Avoids pulling in a markdown library for what is essentially text emphasis.

import React from 'react'

export function InlineMD({ text, className = '' }) {
  if (!text) return null
  const tokens = []
  let buffer = ''
  let i = 0

  const flush = (key) => {
    if (buffer) {
      tokens.push(<React.Fragment key={`t${key}`}>{buffer}</React.Fragment>)
      buffer = ''
    }
  }

  while (i < text.length) {
    if (text[i] === '*' && text[i + 1] === '*') {
      flush(i)
      const end = text.indexOf('**', i + 2)
      if (end === -1) {
        buffer += text[i]
        i += 1
        continue
      }
      tokens.push(
        <strong key={`b${i}`} className="font-semibold text-ink">
          {text.slice(i + 2, end)}
        </strong>
      )
      i = end + 2
    } else if (text[i] === '*') {
      flush(i)
      const end = text.indexOf('*', i + 1)
      if (end === -1) {
        buffer += text[i]
        i += 1
        continue
      }
      tokens.push(
        <em key={`i${i}`} className="italic text-sage-deep">
          {text.slice(i + 1, end)}
        </em>
      )
      i = end + 1
    } else {
      buffer += text[i]
      i += 1
    }
  }
  flush('end')
  return <span className={className}>{tokens}</span>
}
