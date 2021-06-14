import { LoginContainer } from '@app/containers/auth/login';
import { HeaderTags, Title } from '@app/modules/common';

const LoginPage: React.FC = () => (
  <div className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-12 px-2 sm:px-0 flex flex-col text-center">
    <div className="flex flex-col items-center justify-center">
      <svg
        className="w-24 h-24"
        enableBackground="new 0 0 300 300"
        height={44}
        id="logo"
        viewBox="0 0 300 300"
        width={43}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <path
            d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
            fill="#fff"
          />
        </g>
      </svg>
      <Title className="mt-8" tag={HeaderTags.H2}>
        Wal Manager
      </Title>
    </div>

    <Title
      className="mt-16 mx-2 text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight"
      tag={HeaderTags.H3}
    >
      Login To Your Account
    </Title>

    <LoginContainer />
  </div>
);

export default LoginPage;
