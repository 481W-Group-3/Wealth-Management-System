import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import backgroundImage from './images/formImage.jpg'; // Adjust the path as needed

const FormCards = ({
  welcomeTitle,
  welcomeText,
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
    <div className="flex flex-col md:flex-row gap-8 bg-cover bg-center bg-no-repeat p-6 rounded-lg"
         style={{ backgroundImage: `url(${backgroundImage})`, filter: 'saturate(130%)' }}>
      {/* Left side: Welcome text */}
      <div className="w-full md:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md h-auto">
          <h2 className="text-2xl font-bold mb-2">{welcomeTitle}</h2>
          <p className="text-gray-800">{welcomeText}</p>
        </div>
      </div>
      
      {/* Right side: Login form */}
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorMessage}</div>}
          
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                {field.label}:
              </label>
              {field.type === 'password' ? (
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="mb-6">
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

          <div className="flex flex-col items-center mb-6">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="submit">
              {submitButtonText}
            </button>
            {forgotPasswordLink && (
              <a className="font-bold text-sm text-blue-500 hover:text-blue-800" href={forgotPasswordLink.href}>
                {forgotPasswordLink.text}
              </a>
            )}
          </div>

          {createAccountLink && (
            <div className="text-center">
              <a className="font-bold text-sm text-blue-500 hover:text-blue-800" href={createAccountLink.href}>
                {createAccountLink.text}
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormCards;