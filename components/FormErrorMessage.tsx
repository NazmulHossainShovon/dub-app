type Props = {
  message: string;
};

const FormErrorMessage = ({ message }: Props) => {
  return <span className="mt-1 text-xs text-red-500">{message}</span>;
};

export default FormErrorMessage;
