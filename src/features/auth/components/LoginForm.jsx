import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "../../../utils/validators";
import { useAuth } from "../../../context/useAuth";
import { DEMO_ACCOUNTS, SHOW_DEMO_ACCOUNTS } from "../../../lib/demoAccounts";
import TextField from "../../../components/forms/TextField";
import PasswordField from "../../../components/forms/PasswordField";
import SubmitButton from "../../../components/forms/SubmitButton";

export default function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  async function onSubmit(values) {
    const result = await login(values);

    if (result.success) {
      toast.success(`${result.data.name || "کاربر"} عزیز، خوش آمدید`, { description: "ورود با موفقیت انجام شد" });
      onSuccess?.(result.data);
    } else {
      toast.error(result.error || "ورود ناموفق بود، دوباره تلاش کنید");
    }
  }

  function fillDemo(account) {
    setValue("identifier", account.identifier);
    setValue("password", account.password);
    clearErrors();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <TextField
        label="ایمیل یا شماره موبایل"
        placeholder="مثلاً 0912xxxxxxx یا name@email.com"
        autoComplete="username"
        error={errors.identifier}
        {...register("identifier")}
      />

      <PasswordField
        label="رمز عبور"
        placeholder="رمز عبور خود را وارد کنید"
        autoComplete="current-password"
        error={errors.password}
        {...register("password")}
      />

      <div className="flex items-center justify-end text-sm">
        <button type="button" className="cursor-pointer text-forest hover:underline font-medium">
          فراموشی رمز عبور
        </button>
      </div>

      <SubmitButton loading={isSubmitting} label="ورود به حساب کاربری" loadingLabel="در حال ورود…" />

      {SHOW_DEMO_ACCOUNTS && (
        <div className="rounded-2xl border border-dashed border-camel/60 bg-camel/10 p-4">
          <p className="text-xs font-bold text-forest mb-3">حساب‌های آزمایشی (فقط برای نمایش جریان ورود)</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.identifier}
                type="button"
                onClick={() => fillDemo(account)}
                className="cursor-pointer text-right rounded-xl bg-white border border-ink/10 px-3 py-2 hover:border-forest/40 transition-colors"
              >
                <span className="block text-sm font-bold text-ink">{account.label}</span>
                <span className="block text-xs text-ink/50">{account.hint}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
