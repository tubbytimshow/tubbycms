<!doctype html>
<html lang="{{ app()->getLocale() }}"><body style="margin:0;padding:24px;background:#f4f4f5;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#18181b;">
<div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;">
<h2 style="margin:0 0 16px;font-size:20px;">{{ config('app.name') }}</h2>
<p>{{ __('You asked to reset the password for your :hotel account.', ['hotel' => config('app.name')]) }}</p>
<p style="margin:24px 0;"><a href="{{ $resetUrl }}" style="background:#7c3aed;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;display:inline-block;">{{ __('Reset your password') }}</a></p>
<p>{{ __('This link works once and expires in :minutes minutes.', ['minutes' => config('habbo.password_reset_token_time')]) }}</p>
<p style="font-size:13px;color:#52525b;">{{ __('If the button does not work, copy this address into your browser:') }}<br>{{ $resetUrl }}</p>
<p style="font-size:13px;color:#52525b;">{{ __('If you did not request this, you can ignore this email.') }}</p>
</div>
</body></html>
