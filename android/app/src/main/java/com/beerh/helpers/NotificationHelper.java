package com.beerh.helpers;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.TaskStackBuilder;

import com.beerh.MainActivity;
import com.beerh.R;

public class NotificationHelper
{
    private NotificationCompat.Builder mBuilder;

    private static int notificationID;
    private static NotificationHelper instance;
    private static Context m_ctx;
    private static final Boolean BACK_TO_MAIN_ACTIVITY = false;
    public static String CHANNEL_ID = "beerh-01";
    public static int SERVICE_ID = 1;
    private static String serviceDisplayTitle = "";

    public static NotificationHelper getInstance(Context ctx)
    {
        if (instance == null)
        {
            instance = new NotificationHelper();
            notificationID = 2;
        }
        m_ctx = ctx;
        return instance;
    }

    public void addNotification(String title , String message,boolean sound,boolean vibrate)
    {
        try {
            if (mBuilder == null)
                mBuilder = new NotificationCompat.Builder(m_ctx);

            mBuilder.setSmallIcon(R.mipmap.ic_launcher);
            mBuilder.setContentTitle(title);
            mBuilder.setContentText(message);

            if (BACK_TO_MAIN_ACTIVITY) {
                Intent resultIntent = new Intent(m_ctx, MainActivity.class);

                TaskStackBuilder stackBuilder = TaskStackBuilder.create(m_ctx);
                stackBuilder.addParentStack(MainActivity.class);
                stackBuilder.addNextIntent(resultIntent);

                PendingIntent resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);
                mBuilder.setContentIntent(resultPendingIntent);
            }
            Notification notification;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                mBuilder.setPriority(NotificationManager.IMPORTANCE_DEFAULT);
                notification = mBuilder.setChannelId(CHANNEL_ID).build();
            } else {
                mBuilder.setPriority(Notification.PRIORITY_DEFAULT);
                notification = mBuilder.build();
            }

            if (vibrate)
                notification.defaults |= Notification.DEFAULT_VIBRATE;

            if (sound)
                notification.defaults |= Notification.DEFAULT_SOUND;

            ((NotificationManager) m_ctx.getSystemService(Context.NOTIFICATION_SERVICE)).notify(notificationID, notification);

            notificationID++;

        } catch (Exception ex)
        {
            Log.e("Notification",ex.getMessage());
        }
    }

    public void updateServiceNotificationMessage(String displayMessage) {
        Notification notification = getServiceNotification(serviceDisplayTitle, displayMessage);
        ((NotificationManager) m_ctx.getSystemService(Context.NOTIFICATION_SERVICE)).notify(SERVICE_ID, notification);
    }

    public Notification getServiceNotification(String displayTitle, String displayMessage) {
        // Create notification builder.
        NotificationCompat.Builder builder = new NotificationCompat.Builder(m_ctx);

        serviceDisplayTitle = displayTitle;
        // Make notification show big text.
        NotificationCompat.BigTextStyle displayTextStyle = new NotificationCompat.BigTextStyle();
        displayTextStyle.setBigContentTitle(displayTitle);
        displayTextStyle.bigText(displayMessage);

        builder.setContentText("BeerH is running");
        // Set big text style.
        builder.setStyle(displayTextStyle);

        builder.setWhen(System.currentTimeMillis());
        builder.setSmallIcon(R.mipmap.ic_launcher);
        Bitmap largeIconBitmap = BitmapFactory.decodeResource(m_ctx.getResources(), R.mipmap.ic_launcher);
        builder.setLargeIcon(largeIconBitmap);
        // Make the notification max priority.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder.setPriority(NotificationManager.IMPORTANCE_MAX);
        } else {
            builder.setPriority(Notification.PRIORITY_MAX);
        }

        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID,
                    "BeerH Service",
                    NotificationManager.IMPORTANCE_DEFAULT);

            ((NotificationManager) m_ctx.getSystemService(Context.NOTIFICATION_SERVICE)).createNotificationChannel(channel);
            builder.setChannelId(CHANNEL_ID);

        }
        return  builder.build();
    }
}

