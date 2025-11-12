import React from 'react';

export default function ToolQuickActions({ actions }) {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {actions.map((action) => (
        <button
          key={action.key || action.label}
          type='button'
          data-tool-action='true'
          onClick={(event) => {
            event.preventDefault();
            action.onClick?.(event);
          }}
          className='inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700'
          aria-label={action.ariaLabel || action.label}
        >
          {action.icon && <span aria-hidden='true'>{action.icon}</span>}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}


