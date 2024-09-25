import React from 'react';

const FormCard = ({ 
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
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left side: Welcome text */}
      <div className="w-full md:w-1/2">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-auto">
          <h2 className="text-2xl font-bold mb-2">{welcomeTitle}</h2>
          <p className="text-gray-600">{welcomeText}</p>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorMessage}</div>}
          
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                {field.label}:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={field.type === 'password' && showPassword ? 'text' : field.type}
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ))}

          {showPassword !== undefined && (
            <div className="mb-6">
              <label className="flex items-center" htmlFor="showPassword">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                <span className="text-sm">Show password</span>
              </label>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {submitButtonText}
            </button>
            {forgotPasswordLink && (
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href={forgotPasswordLink.href}>
                {forgotPasswordLink.text}
              </a>
            )}
          </div>

          {rememberMe !== undefined && (
            <div className="mt-4">
              <label className="flex items-center" htmlFor="rememberMe">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm">Remember me</span>
              </label>
            </div>
          )}

          {createAccountLink && (
            <div className="mt-6 text-center">
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

export default FormCard;