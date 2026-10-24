import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema } from "../../../utils/validators";
import { useAuth } from "../../../context/useAuth";
import TextField from "../../../components/forms/TextField";
import PasswordField from "../../../components/forms/PasswordField";
import FieldError from "../../../components/forms/FieldError";
import SubmitButton from "../../../components/forms/SubmitButton";

export default function RegisterForm({ onSuccess }) {
  const { register: signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values) {
    const result = await signUp(values);

    if (result.success) {
      toast.success(`${result.data.name || "کاربر"} عزیز، به رخت‌آرا خوش آمدید`, { description: "ثبت‌نام با موفقیت انجام شد" });
      onSuccess?.(result.data);
    } else {
      toast.error(result.error || "ثبت‌نام ناموفق بود، دوباره تلاش کنید");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <TextField
        label="نام و نام‌خانوادگی"
        placeholder="مثلاً سارا احمدی"
        autoComplete="name"
        error={errors.fullName}
        {...register("fullName")}
      />

      <TextField
        label="ایمیل"
        type="email"
        placeholder="name@email.com"
        autoComplete="email"
        error={errors.email}
        {...register("email")}
      />

      <TextField
        label="شماره موبایل"
        type="tel"
        dir="ltr"
        placeholder="0912xxxxxxx"
        autoComplete="tel"
        className="text-right"
        error={errors.phone}
        {...register("phone")}
      />

      <PasswordField
        label="رمز عبور"
        placeholder="حداقل ۸ کاراکتر"
        autoComplete="new-password"
        error={errors.password}
        {...register("password")}
      />

      <PasswordField
        label="تکرار رمز عبور"
        placeholder="رمز عبور را دوباره وارد کنید"
        autoComplete="new-password"
        error={errors.confirmPassword}
        {...register("confirmPassword")}
      />

      <div>
        <label className="flex items-start gap-2 text-sm text-ink/70 cursor-pointer">
          <input type="checkbox" className="accent-forest w-4 h-4 mt-0.5" {...register("acceptTerms")} />
          <span>قوانین و مقررات رخت‌آرا را می‌پذیرم</span>
        </label>
        <FieldError error={errors.acceptTerms} />
      </div>

      <SubmitButton loading={isSubmitting} label="ایجاد حساب کاربری" loadingLabel="در حال ثبت‌نام…" />
    </form>
  );
}
