// 🔧 File: frontend/src/components/ToolRunner.js
// 🔗 Farm Ready — ToolRunner dinamico (compatibile con template duplicabili)

import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toolsAPI } from '../services/api';

function createInitialState(fields) {
  return fields.reduce(
    (acc, field) => {
      if (field.type === 'file') {
        acc.files[field.name] = field.multiple ? [] : null;
      } else {
        acc.params[field.name] = field.defaultValue ?? '';
      }
      return acc;
    },
    { params: {}, files: {} },
  );
}

export default function ToolRunner({ definition, toolMeta }) {
  const { t } = useTranslation();
  const [state, setState] = useState(() => createInitialState(definition.fields));
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [usage, setUsage] = useState(null);

  const handleParamChange = useCallback((fieldName, value) => {
    setState((prev) => ({
      ...prev,
      params: {
        ...prev.params,
        [fieldName]: value,
      },
    }));
  }, []);

  const handleFileChange = useCallback((field, filesList) => {
    setState((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [field.name]: field.multiple ? Array.from(filesList) : filesList[0] || null,
      },
    }));
  }, []);

  const buildFormData = useCallback(() => {
    const formData = new FormData();

    Object.entries(state.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    Object.entries(state.files).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file) {
            formData.append(key, file);
          }
        });
      } else if (value) {
        formData.append(key, value);
      }
    });

    return formData;
  }, [state.params, state.files]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setUsage(null);
    setProgressMessage(t('tool.processing'));

    try {
      const formData = buildFormData();
      const response = await toolsAPI.run(toolMeta.id, formData);
      setResult(response.result);
      const usageInfo = response.usage
        ? {
            total: response.usage.total ?? null,
            perTool: response.usage.perTool ?? null,
            limits: response.usage.limits ?? null,
            premium: response.usage.premium ?? false,
            exceeded: false,
          }
        : null;
      setUsage(usageInfo);
      setProgressMessage(t('tool.completed'));
    } catch (err) {
      const message = err.details || err.message || 'Errore imprevisto';
      setError(message);
      if (err.limits) {
        setUsage({
          total: err.limits.usage?.total ?? null,
          perTool: err.limits.usage?.perTool ?? null,
          limits: {
            total: err.limits.total ?? null,
            perTool: err.limits.perTool ?? null,
          },
          premium: false,
          exceeded: true,
        });
      } else {
        setUsage(null);
      }
      setProgressMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-xl shadow-md space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>{toolMeta.name}</h2>
        <p className='text-gray-600'>{toolMeta.description}</p>
      </div>

      <form className='space-y-5' onSubmit={handleSubmit}>
        {definition.fields.map((field) => (
          <div key={field.name} className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              {field.label}
            </label>

            {field.type === 'textarea' && (
              <textarea
                className='w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                rows={field.rows || 6}
                value={state.params[field.name]}
                onChange={(event) => handleParamChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}

            {field.type === 'text' && (
              <input
                type='text'
                className='w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                value={state.params[field.name]}
                onChange={(event) => handleParamChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}

            {field.type === 'number' && (
              <input
                type='number'
                className='w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                value={state.params[field.name]}
                onChange={(event) => handleParamChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                min={field.min}
                max={field.max}
                step={field.step}
              />
            )}

            {field.type === 'select' && (
              <select
                className='w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white'
                value={state.params[field.name]}
                onChange={(event) => handleParamChange(field.name, event.target.value)}
                required={field.required}
              >
                {(field.allowEmpty || !field.required) && (
                  <option value=''>{field.placeholder || t('tool.selectOption')}</option>
                )}
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'checkbox' && (
              <div className='flex items-center gap-2'>
                <input
                  id={field.name}
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  checked={Boolean(state.params[field.name])}
                  onChange={(event) => handleParamChange(field.name, event.target.checked ? 'true' : 'false')}
                />
                <label htmlFor={field.name} className='text-sm text-gray-600'>
                  {field.helperText}
                </label>
              </div>
            )}

            {field.type === 'file' && (
              <div>
                <input
                  type='file'
                  accept={field.accept}
                  multiple={field.multiple}
                  onChange={(event) => handleFileChange(field, event.target.files)}
                  className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100'
                  required={field.required}
                />
                {field.helperText && (
                  <p className='text-xs text-gray-500 mt-2'>{field.helperText}</p>
                )}
              </div>
            )}

            {field.helperText && !['file', 'checkbox'].includes(field.type) && (
              <p className='text-xs text-gray-500'>{field.helperText}</p>
            )}
          </div>
        ))}

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition'
        >
          {loading ? t('tool.processing') : definition.ctaLabel || t('tool.execute')}
        </button>
      </form>

      {progressMessage && (
        <div className='p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 text-sm'>
          {progressMessage}
        </div>
      )}

      {error && (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
          {error}
        </div>
      )}

      {usage && usage.limits && (
        <div
          className={`p-3 rounded-lg border ${
            usage.exceeded
              ? 'border-amber-300 bg-amber-50 text-amber-800'
              : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          {typeof usage.total === 'number' && typeof usage.limits.total === 'number' && (
            <p>
              {t('tool.usage.summary', {
                current: usage.total,
                limit: usage.limits.total,
              })}
            </p>
          )}
          {typeof usage.perTool === 'number' && typeof usage.limits.perTool === 'number' && (
            <p>
              {t('tool.usage.perTool', {
                current: usage.perTool,
                limit: usage.limits.perTool,
              })}
            </p>
          )}
          {usage.exceeded ? (
            <p className='font-semibold mt-1'>
              {t('tool.usage.limitReached')}
            </p>
          ) : (
            usage.premium && (
              <p className='mt-1'>{t('tool.usage.almostUnlimited')}</p>
            )
          )}
        </div>
      )}

      {result && definition.ResultView && (
        <definition.ResultView result={result} />
      )}
    </div>
  );
}

ToolRunner.propTypes = {
  definition: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      multiple: PropTypes.bool,
      accept: PropTypes.string,
      helperText: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rows: PropTypes.number,
    })).isRequired,
    ResultView: PropTypes.elementType,
    ctaLabel: PropTypes.string,
  }).isRequired,
  toolMeta: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
