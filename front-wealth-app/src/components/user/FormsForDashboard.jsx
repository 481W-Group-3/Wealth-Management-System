import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const FormCards = ({
  handleText,
  handleSubmit,
  formFields,
  showPassword,
  handleShowPassword,
  rememberMe,
  setRememberMe,
  errorMessage,
  submitButtonText,
  forgotPasswordLink,
  createAccountLink
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-md mx-auto relative overflow-hidden rounded-lg shadow-md" style={{ backgroundColor: '#dbdbdb' }}>
        <div className="relative z-10 p-8">
          <h2 className="text-gray-700 text-2xl font-normal mb-6 text-center">
            {handleText}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-100 bg-opacity-75 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {errorMessage}
              </div>
            )}

            {formFields.map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                  {field.label}:
                </label>
                {field.type === 'password' ? (
                  <div className="relative">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 bg-white"
                      type={showPassword ? 'text' : 'password'}
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                ) : (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </div>
            ))}

            {rememberMe !== undefined && (
              <div>
                <label className="flex items-center" htmlFor="rememberMe">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
              </div>
            )}

            <div className="flex flex-col items-center">
              <button
                className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 submit-button"
                type="submit"
              >
                {submitButtonText}
              </button>
              {forgotPasswordLink && (
                <a
                  className="font-bold text-sm text-blue-700 hover:text-blue-900"
                  href={forgotPasswordLink.href}
                >
                  {forgotPasswordLink.text}
                </a>
              )}
            </div>

            {createAccountLink && (
              <div className="text-center">
                <a
                  className="font-bold text-sm text-blue-700 hover:text-blue-900"
                  href={createAccountLink.href}
                >
                  {createAccountLink.text}
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
      <style jsx>{`
        .submit-button {
          background-color: #86c08d;
          border-color: #86c08d;
          border-width: 1px;
          border-style: solid;
          transition: background-color 0.3s ease;
        }
        .submit-button:hover {
          background-color: #6da674;
        }
      `}</style>
    </div>
  );
};

export default FormCards;